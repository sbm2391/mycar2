const Order = require("../models/Order");
const Car = require("../models/Car");
const User = require('../models/User');
const moment = require('moment');

exports.getOrders = function(req, res, next) {
    Order.find()
    .populate("_car")
    .then(items=>res.status(200).json(items))
    .catch(e=>res.status(500).send(e));
  }

exports.postOrder = (req, res, next)=>{
    // hours
    console.log(req.body)
    var result = moment(req.body.endDate,"YYYY-MM-DD HH:mm:ss" ).diff(req.body.startDate,"YYYY-MM-DD HH:mm:ss" )
    var hours = moment.duration(result);
    var finalResult = hours.asHours();
    finalResult = Math.round(finalResult)
    
    Car.findById(req.body._car)
    .then(car => {
        const newOrder = new Order({
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            hour: finalResult,
            total: finalResult * car.price,
            _car : req.body._car,
            _creator : req.user._id
        });

        newOrder.save()
        .then(newOrderCreated=>{
            User.findByIdAndUpdate(req.user._id,
                {$push: {_orders: newOrderCreated._id } }, {'new': true})
            .then(userUpdated => res.status(201).json(userUpdated))
        })
        .catch(e=>res.status(500).send(e));
      })
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