const express = require('express');
const routes = express.Router();
const User = require('../models/user');
const { generateToken, getUserInfo } = require('../Services/UserService');

var jwt = require('jsonwebtoken');



//PASSWORD HASHING
const bcrypt = require('bcrypt');
const saltRounds = 10;




//LOGIN N TOKEN GENERATION
routes.post('/login', (req, res) => {

    User
        .findOne({ email: req.body.email })
        .then((user) => {
            console.log(user)
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.status(200).send({ token: generateToken(req.body) })
            }
            else {
                errorBlock("Email and password doesn't match", res);
            }
        })
        .catch((e) => errorBlock(e, req));

})


//MAKING A NEW USER
routes.post('/signup', (req, res, next) => {
    User
        .findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return errorBlock("User already present", res);
            }

            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                // Store hash in your password DB.
                if (err) {
                    return errorBlock(err, res);
                }
                else {
                    const user = new User({
                        email: req.body.email,
                        password: hash,
                        name: req.body.name
                    });
                    user
                        .save()
                        .then(() => {
                            return res.status(201)
                                .json({ message: 'User created' })
                        })
                        .catch((error) => {
                            return errorBlock(error, res);
                        })
                }
            });
        })
});


routes.post("/abc", (req, res) => {

     const userInfo = getUserInfo(req.headers["authorization"]);
   
    res.status(200).send({user:userInfo});

})




//ERROR BLOCK
errorBlock = (err, res) => {

    return res.status(500).json({
        error: err
    });
};

module.exports = routes;