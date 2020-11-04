const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bio: {
        type: String
    },
    skills: {
        type: [String]
    },
    location: {
        type: String,
        required: true
    },
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        },  
    },
    date: {
        type: Date,
        default: Date.now
    },/*
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref:'users'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            },
            isPositive: {
                type: Boolean,
                required: true
            }
        }
    ]*/
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);