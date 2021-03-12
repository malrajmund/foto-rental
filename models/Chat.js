const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    //w zależności od tego kto wysłał pierwszą wiadomość
    sender: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    senderName: {
        type: String,
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    receiverName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    message: [
        {
            date: {
                type: Date,
                default: Date.now,
            },
            header: {
                type: String
            },
            text: {
                type: String,
                required: true,
            },
            //kierunek wiadomości: sender->receiver (true) lub receiver->sender (false)
            direction: {
                type: Boolean,
            }
        }
    ]
})

module.exports = Chat = mongoose.model("chat", ChatSchema);