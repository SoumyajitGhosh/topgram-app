const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./App.js');

//app config
dotenv.config();

//DB Connection
mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true
    })
    .then(() => console.log('DB Connected'))
    .catch(() => console.log('error occured'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});

// app.get('/', function (req, res) {
//         res.send('we are at the root route of our server');
//   })

// app.post('/sample/put/data', function(req, res) {
//         console.log('receiving data ...');
//         console.log('body is ',req.body);
//         res.send(req.body);
//     });

const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`A Node Js API is listening on port: ${port}`);
});