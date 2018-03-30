const User           = require("../models/User");
const passport       = require("passport");
const bcrypt         = require("bcrypt");
const bcryptSalt     = 19;

exports.signup = (req, res, next) => {
        if (!req.body.username || !req.body.password || !req.body.name) {
            res.status(400).json({ message: "Provide all the fields to sign up" 
        });
    }

    User.findOne({ username:req.body.username }, "username", (err, user) => {
        if (user !== null) {
          res.status(400).json({ message: "The username already exists" });
          return;
        }
        console.log("entro!")    
        let hashPass = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(9), null);
        
    
        let newUser  = new User({
          username:req.body.username,
          password: hashPass,
          name:req.body.name
        });
    
        console.log(newUser);
    
        newUser.save()
          .then(user => {
            req.login(user, (err) => {
              if (err) { return res.status(500).json({ message: "Something went wrong" }); }
              res.status(200).json(req.user);
            })
          .catch(err => res.status(400).json({ message: "Something went wrong" }))
          })
      });
}

exports.login = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) { return res.status(401).json(err); }
        if (!user) { return res.status(401).json(info); }
    
        req.login(user, (err) => {
          if (err) { return res.status(500).json({ message: "Something went wrong" }); }
          return res.status(200).json(req.user);
        });
      })(req, res, next);
}

exports.logout = (req, res) => {
    req.logout();
    res.status(200).json({ message: "Success" });
  }

exports.loggedin = (req, res, next) => {
    if (req.isAuthenticated()) { return res.status(200).json(req.user); }
  return res.status(403).json({ message: "Unauthorized" });
}