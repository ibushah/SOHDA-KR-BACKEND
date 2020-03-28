const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create Schema for user
const UserSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    },

    Ad: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ad'
    }]

});

const User = mongoose.model('User', UserSchema);

module.exports = User;