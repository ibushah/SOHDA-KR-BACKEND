const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create Schema for Ad
const AdSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }

});

const Ad = mongoose.model('Ad', AdSchema);

module.exports = Ad;