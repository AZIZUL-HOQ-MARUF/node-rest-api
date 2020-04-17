module.exports = {
    showIndex: (req, res, next) => {
        res.status(200).json({
            message: 'Receiving JSON from Node RESTful API'
        })
    }
}