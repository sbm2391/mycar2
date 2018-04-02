const User = require("../models/User");
const Order = require("../models/Order");
const Car = require("../models/Car");

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
exports.getUser = function(req, res, next) {
  User.findById(req.params.id)
  .populate({
    path: '_orders',
    model: 'Order',
    populate: {
      path: '_car',
      model: 'Car'
    }
  })
    .then(item=>res.status(200).json(item))
    .catch(e=>res.status(500).send(e));
}
  
  exports.patchUser = (req,res,next)=>{
      User.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then(item=>res.status(200).json(item))
    .catch(e=>res.status(500).send(e));
  }
  
  
  exports.getUsers = function(req, res, next) {
    User.find()
    .then(items=>res.status(200).json(items))
    .catch(e=>res.status(500).send(e));
  }