const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MessageSchema = require('./message');


//Create Schema for Chat
const ChatSchema = new Schema({

    user1_id: {
        type: String,
        required: true
    },

    user2_id:{
        type: String,
        required: true
    }

});

const User = mongoose.model('chat',ChatSchema);

module.exports = User;