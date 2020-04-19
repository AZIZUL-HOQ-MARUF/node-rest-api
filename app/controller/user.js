const express = global.express, router = express.Router();
const User = require('../models/user'),
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    AppResponse = require('../app-response'),
    jwt = require('jsonwebtoken');


router.post('/signup', (req, res) => {
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
router.post('/login', (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (!user.length) {
                return res.status(401).json(new AppResponse(res.statusCode, null, 'Email or Password Invalid'));
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json(new AppResponse(res.statusCode, null, 'Email or Password Invalid'));
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            id: user[0]._id
                        },
                        process.env.JWT_PRIVATE_KEY,
                        {
                            expiresIn: "1h"
                        }
                    )
                    return res.status(200).json(new AppResponse(res.statusCode, { token: token }, 'Auth Success'));
                }
                res.status(401).json(new AppResponse(res.statusCode, null, 'Email or Password Invalid'));
            })
        })
        .catch(err => {
            res.status(500).json(new AppResponse(res.statusCode, null, err.message));
        });
})
router.delete('/:userId', (req, res) => {
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