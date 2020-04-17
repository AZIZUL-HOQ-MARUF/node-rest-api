//Routing Error Handler
global.app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

//Any kind of error Handler in the Application
global.app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            path: req.headers.host + req.originalUrl,
            message: error.message
        }
    })
})
module.exports = {}