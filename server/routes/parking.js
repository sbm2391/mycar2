var express = require('express');
var router = express.Router();
const controller = require("../controllers/parking.controller");

router.get('/', controller.getParkings);
router.post('/', controller.postParking);
router.patch('/:id', controller.patchParking);
router.delete('/:id', controller.deleteParking);

module.exports = router;