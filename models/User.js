const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    province: {
        type: String,
        required: true
    },
    town: {
        type: String,
        required: true,
    },
    street:{
        type: String,
        required: true
    },
    streetNumber: {
        type: Number,
        required: true
    },
    postCode:{
        type: Number,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);