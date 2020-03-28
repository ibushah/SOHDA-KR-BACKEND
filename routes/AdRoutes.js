const express = require('express');
const routes = express.Router();
const Ad = require("../models/ad");
const { getUserInfo } = require('../Services/UserService')
const User = require("../models/user");


//POST AN AD
routes.post("/", (req, res) => {

    const userObj = getUserInfo(req.headers.authorization);

    User.findOne({ email: userObj.email })
        .then((user) => {
            const Add = new Ad({ name: req.body.name, category: req.body.category, price: req.body.price, user_id: user._id })
            Add.save()
                .then(() => res.status(200).send({ message: "Ad successfully posted" }))
                .catch((error) => res.status(500).send({ error }));

        })

})

//get an add by id
routes.get("/:adId",checkToken, (req, res) => {
    Ad
        .findById(req.params.adId)
        .then(ad => res.status(200).send(ad))
        .catch(err => res.status(500).send(err))
})

function checkToken(req,res,next){
    console.log(req.headers.authorization)
    if (!req.headers.authorization)
    res.status(500).send({error:"No Token found"})

    next();
}



//GET all ADs
routes.get("/all", (req, res) => {
    Ad
        .find()
        .populate("user_id")
        .then((ads) => res.status(200).send(ads))
        .catch(err => res.status(500).send(err))

})


module.exports = routes;