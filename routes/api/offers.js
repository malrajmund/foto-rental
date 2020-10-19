const express = require('express');
const router = express.Router();

// @route   GET api/offers
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Offers route'));

module.exports = router;