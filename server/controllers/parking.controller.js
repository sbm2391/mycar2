const Parking= require("../models/Parking");
const Car= require("../models/Car");


exports.getParkings = function(req, res, next) {
    Parking.find()
    .populate("_cars")
    .then(items=>res.status(200).json(items))
    .catch(e=>res.status(500).send(e));
  }
  
exports.postParking = (req, res, next)=>{
const newParking = new Parking({
    _cars : req.body._cars,
    location: {
    address: req.body.location.address,
    coordinates: req.body.location.coordinates
    }
});

newParking.save()
.then(item=>res.status(201).json(item))
.catch(e=>res.status(500).send(e));

}

exports.patchParking = (req,res,next)=>{
Parking.findByIdAndUpdate(req.params.id, req.body, {new:true})
.then(item=>res.status(200).json(item))
.catch(e=>res.status(500).send(e));
}

exports.deleteParking = (req,res,next)=>{
Parking.findByIdAndRemove(req.params.id)
.then(lists=>res.status(200).json(lists))
.catch(e=>res.status(500).send(e));
}