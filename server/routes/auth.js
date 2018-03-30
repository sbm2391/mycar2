const express        = require("express");
const auth           = express.Router();
const controller     = require("../controllers/auth.controller");

auth.post("/signup", controller.signup);
auth.post("/login", controller.login);
auth.post("/logout", controller.logout);
auth.get("/loggedin", controller.loggedin);

auth.get("/private", (req, res) => {
  if (req.isAuthenticated()) { return res.json({ message: req.user.secret }); }
  return res.status(403).json({ message: "Unauthorized" });
});


module.exports = auth;
