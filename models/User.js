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
        type: Int8Array,
        required: true
    },
    code:{
        type: Int8Array,
        required: true
    },
    phoneNumber:{
        type: Int8Array,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model('user', UserSchema);