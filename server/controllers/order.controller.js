const Order = require("../models/Order");
const Car = require("../models/Car");
const User = require('../models/User');

exports.getOrders = function(req, res, next) {
    Order.find()
    .populate("_car")
    .then(items=>res.status(200).json(items))
    .catch(e=>res.status(500).send(e));
  }

exports.postOrder = (req, res, next)=>{
const newOrder = new Order({
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    // hour: req.body.hour,
    total: req.body.total,
    _car : req.body._car,
    // _creator : req.body._creator
});

newOrder.save()
.then(item=>res.status(201).json(item))
.catch(e=>res.status(500).send(e));

}

exports.patchOrder = (req,res,next)=>{
Order.findByIdAndUpdate(req.params.id, req.body, {new:true})
.then(item=>res.status(200).json(item))
.catch(e=>res.status(500).send(e));
}

exports.deleteOrder = (req,res,next)=>{
Order.findByIdAndRemove(req.params.id)
.then(lists=>res.status(200).json(lists))
.catch(e=>res.status(500).send(e));
}