const express = global.express, router = express.Router();
const User = require('../models/user'),
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    AppResponse = require('../app-response');


router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length) { // It will return array
                return res.status(409).json(new AppResponse(res.statusCode, null, 'Mail exists'))
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json(new AppResponse(res.statusCode, null, err));
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                res.status(201).json(new AppResponse(res.statusCode, null, 'User Created'));
                            })
                            .catch(err => {
                                res.status(500).json(new AppResponse(res.statusCode, null, err.message));
                            });
                    }
                });
            }
        })
        .catch(err => {
            res.status(500).json(new AppResponse(res.statusCode, null, err.message));
        });
});
router.delete('/:userId', (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json(new AppResponse(res.statusCode, null, 'User Deleted'));
        })
        .catch(err => {
            res.status(500).json(new AppResponse(res.statusCode, null, err.message));
        });
})

module.exports = router;