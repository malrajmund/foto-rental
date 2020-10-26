const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { restart } = require('nodemon');
const config = require('config');

const User = require('../../models/User')

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/',  [
    check('firstName', 'Imię jest wymagane!')
        .not() // not() i isEmpty() sprawdza czy pole nie jest puste
        .isEmpty(),
    check('password', 'Wprowadź hasło z 6 lub więcej liter!')
        .isLength({min: 6})
    //TODO - reszta walidacji
], 
async (req, res) => {
    const errors = validationResult(req);
    // Sprawdzenie czy są errory
    if(!errors.isEmpty()){
        return res
            .status(400)
            .json({ errors: errors.array() });
    }
    //Destrukturyzacja obiektu req.body
    const { firstName, lastName, email, province, town, street, streetNumber, postCode, phoneNumber, password } = req.body;

    try{
        let user = await User.findOne({ email });
        if(user){
            return res
                .status(400)
                .json( {errors: [{ msg: 'User already exists'}]});
        }
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            firstName,
            lastName,
            email,
            province,
            town,
            street,
            streetNumber,
            postCode,
            phoneNumber,
            password,
            avatar
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }); 

    }   catch(err){
        console.error(err.message);
        res
            .status(500)
            .send('Server error');
    }
});

module.exports = router;