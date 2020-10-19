const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');


// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/',  [
    check('firstName', 'Imię jest wymagane!')
        .not() // not() i isEmpty() sprawdza czy pole nie jest puste
        .isEmpty(),
    //TODO - reszta walidacji
], 
(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    res.send('User route');
});

module.exports = router;