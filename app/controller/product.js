const express = global.express, router = express.Router();
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Receving JSON from /product Controller"
    })
});
router.get('/sold', (req, res, next) => {
    res.status(200).json({
        "data": {
            "productID": [3, 5, 7, 10]
        }
    })
})
router.post('/update-product', (req, res, next) => {
    // let headerParam = req.headers.name; // get value from headers 
    const { name, id, color } = req.body; //it's called object destructing 
    res.status(200).json({ name, id, color });
})

//export the Module
module.exports = router;