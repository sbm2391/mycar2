const User = require("../models/User");

exports.deleteUser = (req,res,next)=>{
    User.findByIdAndRemove(req.params.id)
    .then(items=>res.status(200).json(items))
    .catch(e=>res.status(500).send(e));
  }
  //img
//   exports.patchImageUser = (req,res,next)=>{
//      const update ={
//       profilePic: `/uploads/${req.file.filename}` || req.user.profilePic, 
//     }
//     console.log("entrando a modificar usuario")
//       User.findByIdAndUpdate(req.params.id, update, {new:true})
//     .then(item=>res.status(200).json(item))
//     .catch(e=>res.status(500).send(e));
//   }
  
  exports.patchUser = (req,res,next)=>{
    console.log("entrando a modificar usuario")
      User.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then(item=>res.status(200).json(item))
    .catch(e=>res.status(500).send(e));
  }
  
  
  exports.getUsers = function(req, res, next) {
    User.find()
    .then(items=>res.status(200).json(items))
    .catch(e=>res.status(500).send(e));
  }