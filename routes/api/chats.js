const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const Chat = require("../../models/Chat");
const config = require('config');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const sendgrid_api_key = config.get('sendgrid_api_key');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: sendgrid_api_key
    }
}))


// @route   POST api/chats
// @desc    Stwórz chat
// @access  Private
router.post("/", async (req, res) => {
    try {
        var chat = await Chat.findOne().and([{ receiver: req.body.sender }, { sender: req.body.receiver }]);
        var dir = false;
        if (!chat) {
            chat = await Chat.findOne().and([{ sender: req.body.sender }, { receiver: req.body.receiver }]);
            var dir = true;
        }
        if (!chat) {
            var dir = true;
            chat = new Chat({
                sender: req.body.sender,
                senderName: req.body.senderName,
                receiver: req.body.receiver,
                receiverName: req.body.receiverName,
                date: Date.now(),
            });
            chat = await chat.save();
        }
        const newMessage = {
            header: req.body.header,
            text: req.body.text,
            date: Date.now(),
            direction: dir,
        }
        var usender = await User.findById(chat.receiver).select("-password");
        var ureceiver = await User.findById(chat.sender).select("-password");
        if (dir) {
            usender = await User.findById(chat.sender).select("-password");
            ureceiver = await User.findById(chat.receiver).select("-password");
        }
        chat.date = newMessage.date;
        chat.message.push(newMessage);
        var html = newMessage.header ? "<h1>Użytkownik " + usender.firstName + " " + usender.lastName + " wysłał Ci nową wiadomość.<h2><i>"
            + newMessage.header + "</i><p>" + newMessage.text + "</p></h2>"
            : "<h1>Użytkownik " + usender.firstName + " " + usender.lastName + " wysłał Ci nową wiadomość.<h2>" + newMessage.text + "</h2>";
        await chat.save().then(chat => {
            transporter.sendMail({
                to: ureceiver.email,
                from: "fotorental.noreply@gmail.com",
                subject: "Masz nową wiadomość",
                html: html
            })
        });
        res.json(chat);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   PUT api/chats/:id
// @desc    Nowa wiadomość
// @access  Private

router.put("/:id", auth, async (req, res) => {
    try {
        //jeśli user wysyłający wiadomość jest odbiorcą pierwszej wiadomości, direction = false
        const chat = await Chat.findById(req.params.id);
        var dir = req.user.id.toString() === chat.receiver.toString() ? false : true;
        const newMessage = {
            header: null,
            text: req.body.text,
            date: Date.now(),
            direction: dir,
        }
        chat.date = newMessage.date;
        chat.message.push(newMessage);
        var usender = await User.findById(chat.receiver).select("-password");
        var ureceiver = await User.findById(chat.sender).select("-password");
        if (dir) {
            usender = await User.findById(chat.sender).select("-password");
            ureceiver = await User.findById(chat.receiver).select("-password");
        }
        var html = newMessage.header ? "<h1>Użytkownik " + usender.firstName + " " + usender.lastName + " wysłał Ci nową wiadomość.<h2><i>" + newMessage.header + "</i><p>" + newMessage.text + "</p></h2>"
            : "<h1>Użytkownik " + usender.firstName + " " + usender.lastName + " wysłał Ci nową wiadomość.<h2>" + newMessage.text + "</h2>";
        chat.save().then(chat => {
            transporter.sendMail({
                to: ureceiver.email,
                from: "fotorental.noreply@gmail.com",
                subject: "Masz nową wiadomość",
                html: html
            })
        });
        res.json(chat);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

//@route    GET api/chats
//@desc     GET wszystkie czaty użytkownika
//@access   Private
router.get("/", async (req, res) => {
    try {
        const chats = await Chat.find().sort({ date: -1 });
        res.json(chats);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;