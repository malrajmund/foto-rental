const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    offerName: {
        type: String
    },
    avatar:{
        type: String
    },
    pricePerDay: {
        type: Number
    },
    image : {
        data: Buffer, 
        contentType: String 
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Offer = mongoose.model('offer', OfferSchema);