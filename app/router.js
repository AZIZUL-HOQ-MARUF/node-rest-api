const express = global.express,
    router = express.Router(),
    mainController = require('./controller/main-controller');

// Main Route
router.get('/', mainController.showIndex);

//Productt controller
const productRouter = require('./controller/product');
global.app.use('/product', productRouter);
//User Controller
global.app.use('/user', require('./controller/user'));

//export the Module
module.exports = router;