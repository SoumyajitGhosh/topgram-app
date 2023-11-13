const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./App.js");
const cookieParser = require("cookie-parser");
const socket = require("socket.io");

//app config
dotenv.config();

// Use cookie-parser middleware
app.use(cookieParser());

//DB Connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected"))
  .catch(() => console.log("error occured"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

// Route to retrieve the token cookie
app.get("/token", (req, res) => {
  const token = req.cookies.token;
  console.log("Getting called", token);
  if (!token) {
    res.status(401).send("No token found");
  } else {
    res.send(token);
    console.log("Token:", token);
  }
});

const port = process.env.PORT || 9000;

const server = app.listen(port, () => {
  console.log(`A Node Js API is listening on port: ${port}`);
});

const io = socket(server
  , {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
}
);

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
