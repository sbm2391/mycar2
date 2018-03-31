var express = require('express');
var router = express.Router();
const controller = require("../controllers/car.controller");

router.get('/', controller.getCars);
router.post('/', controller.postCar);
router.patch('/:id', controller.patchCar);
router.delete('/:id', controller.deleteCar);

module.exports = router;