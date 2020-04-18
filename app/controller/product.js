const express = global.express, router = express.Router();
const Product = require('../models/product'),
    mongoose = require('mongoose'),
    AppResponse = require('../app-response');
router.get('/', (req, res, next) => {
    Product.find()
        .select('_id name color price')
        .exec()
        .then(result => {
            res.status(200).json(new AppResponse(res.statusCode, result));
        }).catch(err => {
            res.status(500).json({ error: err });
        })
});
router.get('/single/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).select('_id name color price').exec()
        .then(result => {
            res.status(200).json(new AppResponse(res.statusCode, result, null));
        }).catch(err => {
            res.status(500).json(new AppResponse(res.statusCode, null, err.message));
        });

});
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(new AppResponse(res.statusCode, null, 'Product Deleted'));
        }).catch(err => {
            res.status(500).json(new AppResponse(res.statusCode, null, err.message));
        });
})
router.get('/sold', (req, res, next) => {
    console.log(getGlobalThis())
    res.status(200).json({
        "data": {
            "productID": [3, 5, 7, 10]
        }
    })
})
router.post('/create-product', (req, res, next) => {
    // let headerParam = req.headers.name; // get value from headers 
    const { name, color, price } = req.body; //it's called object destructing 
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        ...{ name, color, price }
    });
    product.save() //save the model to mongoDB
        .then(result => {
            res.status(201).json(new AppResponse(res.statusCode, result, 'Product Created'));
        }).catch(err => {
            res.status(500).json(new AppResponse(res.statusCode, null, err.message));
        });
})

//export the Module
module.exports = router;