const express = require('express');
const cors = require('cors');
const compression = require("compression");
const cookieParser = require('cookie-parser');
const helmet = require("helmet");
const dotenv = require('dotenv');

// Create the Express application object
const app = express();

//app config
dotenv.config();

// Compress the HTTP response sent back to a client
app.use(compression()); //Compress all routes

// Use cookie-parser middleware
app.use(cookieParser());

// Use Helmet to protect against well known vulnerabilities
app.use(helmet());

// Set up cors to allow us to accept requests from our client
app.use(
	cors(
		{
		origin: "http://localhost:3000", // <-- location of the react app were connecting to
		credentials: true,
	}
	)
);



// Parsers
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

/**
 * -------------- ROUTES ----------------
 */
 require("./user/userRouter")(app);
 require("./posts/postRouter")(app);
 require("./messages/messageRouter")(app);

module.exports = app;