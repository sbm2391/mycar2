const Car = require("../models/Car");

exports.getCars = function(req, res, next) {
    Car.find()
    .then(items=>res.status(200).json(items))
    .catch(e=>res.status(500).send(e));
  }
  
exports.postCar = (req, res, next)=>{
    Car.find()
        .then(carList => {
            const newCar = new Car({
                marca: req.body.marca,
                modelo: req.body.modelo,
                year: req.body.year,
                price: req.body.price,
                gadges: req.body.gadges,
                index: carList.length + 1,
                img: `/images/cars/${req.body.img}`,
                location: {
                    address: req.body.location.address,
                    coordinates: req.body.location.coordinates
                    }
            });
            
            newCar.save()
            .then(item=>res.status(201).json(item))
            .catch(e=>res.status(500).send(e));
        })

}

exports.patchCar = (req,res,next)=>{
Car.findByIdAndUpdate(req.params.id, req.body, {new:true})
.then(item=>res.status(200).json(item))
.catch(e=>res.status(500).send(e));
}

exports.deleteCar = (req,res,next)=>{
Car.findByIdAndRemove(req.params.id)
.then(lists=>res.status(200).json(lists))
.catch(e=>res.status(500).send(e));
}