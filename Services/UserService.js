const User = require('../models/user');
var jwt = require('jsonwebtoken');


generateToken = (obj) => {

    return jwt.sign({
        data: obj
    }, 'secret');
}

getUserInfo = (token) => {

    return jwt.verify(token, "secret", (err, decodedToken) => {
        if (err)
            return new Error("Token error")

        return decodedToken.data;
    })
}


module.exports = {
    generateToken,
    getUserInfo
}


