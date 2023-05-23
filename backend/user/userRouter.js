const loginmiddleware = require("./userService");
const controller = require("./userController");

module.exports = (app) => {
	// Route to handle SignUp requests
	app.post("/signup", controller.signup);

	// Route to handle SignIn requests
	app.post("/signin", controller.signin);

	// Route to add Profile Picture
	app.patch("/profile-pic", controller.profilepic);

	// Route to handle Reset Passwords requests
	app.post("/reset-pwd", controller.resetPwd);

	// Route to handle Create New Passwords requests
	app.post("/new-pwd", controller.newPwd);

	// Getting the user details by id
	app.get("/user/:id", loginmiddleware, controller.user);

	// Follow a user
	app.put("/follow", loginmiddleware, controller.follow);

	// UnFollow a user
	app.put("/unfollow", loginmiddleware, controller.unfollow);

	// Retrieve all Bookmarks
	app.get("/bookmarks", loginmiddleware, controller.bookmarks);

	// Bookmark a post
	app.put("/bookmark-post", loginmiddleware, controller.bookmarkPost);

	// Remove a bookmark
	app.put("/remove-bookmark", loginmiddleware, controller.removeBookmark);

	// Update the profile picture
	// // Just Wrote the logic of it but not yet tested and the client implementation doesn't exist yet
	// app.put("/update-picture", loginmiddleware, controller.updatePicture);

	// Search for a user by email
	app.post("/users-research", controller.userSearch);
};
