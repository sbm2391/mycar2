var express = require('express');
var router = express.Router();
const controller = require("../controllers/order.controller");

router.get('/', controller.getOrders);
router.post('/', controller.postOrder);
router.patch('/:id', controller.patchOrder);
router.delete('/:id', controller.deleteOrder);

module.exports = router;