const express = require('express'),
    app = express(),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    dotenv = require('dotenv');

//make available the express and app property
global.express = express;
global.app = app;

dotenv.config(); //config dotenv 

//connnecting to mongoDB
mongoose.connect('mongodb+srv://node-rest-api:' +
    process.env.MONGO_ATLAS_PSSWD +
    '@node-rest-api-sr12r.mongodb.net/aziz-db?retryWrites=true&w=majority',
    {
        useUnifiedTopology: true, // both added to remove warning
        useNewUrlParser: true
    }
);
app.use(morgan('dev')); //log routing for dev

app.use(bodyParser.urlencoded({ extended: false }));// accepting application/x-www-form-urlencoded
app.use(bodyParser.json()); // accepting application/json

//Allow CORS, Headers, Methods
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use(require('./app/router'));//using router module

const errorHandler = require('./app/error-handler'); //Error Handler


app.listen(process.env.PORT, () => console.log(`Node With Mongo app listening on port ${process.env.PORT}!`)); //start server