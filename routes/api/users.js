const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { restart } = require("nodemon");
const config = require("config");
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const sendgrid_api_key = config.get('sendgrid_api_key');
const User = require("../../models/User");


const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: sendgrid_api_key
  }
}))
// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    check("firstName", "Imię jest wymagane!")
      .not() // not() i isEmpty() sprawdza czy pole nie jest puste
      .isEmpty(),
    check("password", "Wprowadź hasło z 6 lub więcej liter!")
      .isLength({ min: 6 })
      .bail()
      .not()
      .isEmpty(),
    check("email", "Wprowadź email!").isEmail().bail().not().isEmpty(),
    check("town", "Wprowadź miasto!").not().isEmpty(),
    check("street", "Wprowadź ulicę!").not().isEmpty(),
    check("streetNumber", "Wprowadź numer domu!").not().isEmpty(),
    check("postCode", "Wprowadź kod pocztowy!").not().isEmpty(),
    check("phoneNumber", "Wprowadź numer telefonu!").not().isEmpty(),
    check("billingNumber", "Wprowadź poprawny numer rachunku!").isLength({
      min: 26,
      max: 26,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // Sprawdzenie czy są errory
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Destrukturyzacja obiektu req.body
    const {
      firstName,
      lastName,
      email,
      town,
      street,
      streetNumber,
      postCode,
      phoneNumber,
      password,
      billingNumber,
    } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          errors: [{ msg: "Użytkownik już istnieje w bazie danych!" }],
        });
      }
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        firstName,
        lastName,
        email,
        town,
        street,
        streetNumber,
        postCode,
        phoneNumber,
        password,
        avatar,
        billingNumber,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save().then(user => {
        transporter.sendMail({
          to: user.email,
          from: "fotorental.noreply@gmail.com",
          subject: "Witamy w Fotorental!",
          html: "<h1>Witaj, " + user.firstName + "!</h1><h2>Rejestracja Twojego konta przebiegła pomyślnie, teraz możesz wypożyczać sprzęt od innych użytkowników oraz wystawiać własne oferty.</h2><a href='http://localhost:3000/dashboard'>Przejdź na Fotorental</a>"
        })
      }
      )

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
