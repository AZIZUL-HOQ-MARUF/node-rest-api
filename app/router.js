const express = global.express,
    router = express.Router(),
    mainController = require('./controller/main-controller');

// Main Route
router.get('/', mainController.showIndex);

//Productt controller
const productRouter = require('./controller/product');
global.app.use('/product',productRouter);
//export the Module
module.exports = router;