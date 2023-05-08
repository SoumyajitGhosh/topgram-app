const Post = require("../posts/postModel");
const User = require("./userModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.user = (req, res) => {
	User.findOne({ _id: req.params.id })
		.select("-Password")
		.then((user) => {
			Post.find({ PostedBy: req.params.id })
				.populate("PostedBy", "_id Name")
				.exec((err, result) => {
					if (err) return res.status(422).json();
					const posts = [];
					result.map((item) => {
						posts.push({
							_id: item._id,
							Title: item.Title,
							Body: item.Body,
							Photo: item.Photo.toString("base64"),
							PhotoType: item.PhotoType,
							Likes: item.Likes,
							Comments: item.Comments,
							Followers: item.Followers,
							Following: item.Following,
						});
					});
					res.json({ user, posts });
				});
		})
		.catch((err) => {
			return res.status(404).json({ Error: "User not found" });
		});
};

exports.follow = (req, res) => {
	User.findByIdAndUpdate(
		req.body.followId,
		{
			$push: { Followers: req.user._id },
		},
		{
			new: true,
		},
		(err, result) => {
			if (err) {
				return res.status(422).json({ error: err });
			}
			User.findByIdAndUpdate(
				req.user._id,
				{
					$push: { Following: req.body.followId },
				},
				{ new: true }
			)
				.select("-Password")
				.then((result) => {
					res.json(result);
				})
				.catch((err) => {
					return res.status(422).json({ error: err });
				});
		}
	);
};

exports.unfollow = (req, res) => {
	User.findByIdAndUpdate(
		req.body.unfollowId,
		{
			$pull: { Followers: req.user._id },
		},
		{
			new: true,
		},
		(err, result) => {
			if (err) {
				return res.status(422).json({ error: err });
			}
			User.findByIdAndUpdate(
				req.user._id,
				{
					$pull: { Following: req.body.unfollowId },
				},
				{ new: true }
			)
				.select("-Password")
				.then((result) => {
					res.json(result);
				})
				.catch((err) => {
					return res.status(422).json({ error: err });
				});
		}
	);
};

exports.bookmarks = (req, res) => {
	User.find({ _id: req.user._id })
		.select("-Password")
		.then((user) => {
			const data = user[0].Bookmarks;
			Post.find({ _id: { $in: data } })
				.populate("PostedBy", "_id Name")
				.then((result) => {
					let bookmark = [];
					result.map((item) => {
						bookmark.push({
							_id: item._id,
							PostedBy: item.PostedBy,
							Title: item.Title,
							Body: item.Body,
							Photo: item.Photo.toString("base64"),
							PhotoType: item.PhotoType,
							Likes: item.Likes,
							Comments: item.Comments,
						});
					});
					res.json({ bookmark });
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => {
			return res.status(404).json({ Error: "User not found" });
		});
};

exports.bookmarkPost = (req, res) => {
	User.findByIdAndUpdate(
		req.user._id,
		{
			$push: { Bookmarks: req.body.postId },
		},
		{ new: true }
	)
		.select("-Password")
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			return res.json({ error: err });
		});
};

exports.removeBookmark = (req, res) => {
	User.findByIdAndUpdate(
		req.user._id,
		{
			$pull: { Bookmarks: req.body.postId },
		},
		{ new: true }
	)
		.select("-Password")
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			return res.json({ error: err });
		});
};

// exports.updatePicture = (req, res) => {
// 	User.findByIdAndUpdate(
// 		req.user._id,
// 		{ $set: { Photo: req.body.Photo, PhotoType: req.body.PhotoType } },
// 		{ new: true },
// 		(err, result) => {
// 			if (err) {
// 				return res.status(422).json({ error: "pic canot post" });
// 			}
// 			res.json(result);
// 		}
// 	);
// };

exports.userSearch = (req, res) => {
	let pattern = new RegExp("^" + req.body.pattern);
	User.find({ Email: { $regex: pattern } })
		.select("_id Email Name")
		.then((user) => {
			res.json({ user });
		})
		.catch((err) => {
			console.log(err);
		});
};

// SignUp Controller
exports.signup = (req, res) => {
	const { name, email, password } = req.body;
	// Verifying if one of the fields is Empty
	if (!name || !password || !email) {
		return res.json({ error: "Please submit all required field" });
	}
	// Else we search the user with the credentials submitted
	User.findOne({ Email: email })
		.then((savedUser) => {
			// Verify if the user exist in the DB
			if (savedUser) {
				return res.json({ error: "This Email Is Already Used !" });
			}
			// We Hash the pwd before save into DB, more the number is high more it's more secure
			bcrypt.hash(password, 12).then((hashedPwd) => {
				const user = new User({
					Name: name,
					Email: email,
					Password: hashedPwd,
				});
				// We save our new user to DB
				user.save()
					.then((user) => {
						// // after saving the user into DB we send a confirmation email
						// const email = {
						// 	from: "no-reply@insta-clone.com",
						// 	to: user.Email,
						// 	subject: "Your account has been created successfully",
						// 	html: "<h1>Welcome to InstaClone</h1>",
						// };
						// sgMail.send(email);
						res.json({ message: "Saved successfully " });
					})
					.catch((err) => {
						console.log(err);
					});
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

// SignIn Controller
exports.signin = (req, res) => {
	const { email, password } = req.body;
	// Verification for an empty field
	if (!email || !password) {
		return res.json({ error: "Please provide Email or Password" });
	}
	// Check if email exist in our DB
	User.findOne({ Email: email })
		.then((savedUser) => {
			if (!savedUser) {
				return res.json({ error: "Sorry, your password was incorrect. Please double-check your password" });
			}
			bcrypt.compare(password, savedUser.Password).then((doMatch) => {
				if (doMatch) {
					// we will generate the token based on the ID of user
					const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
					// send cookie to frontend. If we set httpOnly and secure as true, it will not be retrievable in FE
					res.cookie('token', token, { maxAge: 900000, httpOnly: false, secure: false });
					// retrieve the user info details and send it to the front
					const { _id, Name, Email, Followers, Following, Bookmarks } = savedUser;
					res.json({ token, user: { _id, Name, Email, Followers, Following, Bookmarks } });
				} else {
					return res.json({
						error: "Invalid Email or Password",
					});
				}
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

// Reset Password Controller
exports.resetPwd = (req, res) => {
	crypto.randomBytes(32, (err, buffer) => {
		if (err) {
			console.log(err);
		}
		const token = buffer.toString("hex");
		User.findOne({ Email: req.body.email }).then((user) => {
			if (!user) {
				console.log("simple check of the error source");
				return res.json({ error: "No User exists with that email" });
			}

			user.ResetToken = token;
			user.ExpirationToken = Date.now() + 600000; // 10min in ms
			user.save().then((result) => {
				// this section will be fully functional after adding the SendGrid API Key
				// in order to use this feature
				// the following is an example of Email template

				// const email = {
				// 	from: "no-reply@insta-clone.com",
				// 	to: user.Email,
				// 	subject: "Password Reset",
				// 	html: `
				//      <p>A request has been made to change the password of your account </p>
				// 	 <h5>click on this <a href="http://localhost:3000/reset/${token}">link</a> to reset your password</h5>
				// 	 <p> Or copy and paste the following link :</p>
				// 	 <h5>"http://localhost:3000/reset/${token}"</h5>
				// 	 <h5>The link is only valid for 10min</h5>
				// 	 <h5>If you weren't the sender of that request , you can just ignore the message</h5>
				//      `,
				// };
				// sgMail.send(email);

				res.json({ message: "check your Email Inbox" });
			});
		});
	});
};

// New Password Controller
exports.newPwd = (req, res) => {
	const Password = req.body.password;
	const Token = req.body.token;
	User.findOne({ ResetToken: Token, ExpirationToken: { $gt: Date.now() } })
		.then((user) => {
			if (!user) {
				return res.status(422).json({ error: "Session expired ! Try Again with a new Request" });
			}
			bcrypt.hash(Password, 12).then((HashPwd) => {
				user.password = HashPwd;
				user.ResetToken = undefined;
				user.ExpirationToken = undefined;
				user.save().then((result) => {
					res.json({ message: "Password Updated successfully" });
				});
			});
		})
		.catch((err) => {
			console.log(err);
		});
};
