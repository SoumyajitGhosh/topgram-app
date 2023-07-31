const controller = require("./messageController");
const loginmiddleware = require("../user/userService");

module.exports = (app) => {
    //Send new message
    app.post("/addmsg/", controller.addMessage);

    //Fetch previous messages
    app.post("/getmsg/", controller.getMessages);
}