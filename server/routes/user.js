var express = require('express');
var router = express.Router();
const controller = require("../controllers/user.controller");
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });

router.get('/', controller.getUsers);
router.get('/:id', controller.getUser);
router.patch('/:id', controller.patchUser);
router.delete('/:id', controller.deleteUser);
router.patch('/:id/addimg', upload.single('file'), controller.patchImageUser);
module.exports = router;