const express = require('express');
const router = express.Router();
const { check, validationResault, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const multer = require('multer'); 
const upload = multer({ dest: 'uploads/' })
const fs = require('fs'); 
const fileUpload = require('express-fileupload')

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Offer = require('../../models/Offer');

const imgPath = 'uploads/talin.jpg' // TODO pobieranie path z html

// @route   POST api/offers
// @desc    Stwórz offerte
// @access  Private
router.post('/', 
    [   
        auth, 
        [
            check('text', 'Opis jest wymagany')
                .not()
                .isEmpty(),
            check('image', 'Zdjecie jest wymagane!')
                .not()
                .isEmpty()

        ]
    ], 
    upload.single("file")
    ,
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');

            

            const newOffer = new Offer({
                text: req.body.text,
                name: user.name,
                offerName: req.body.offerName,
                avatar: user.avatar,
                pricePerDay: req.body.pricePerDay,
                user: req.user.id,
                image: fs.readFileSync(req.file.path)
            });

            const offer = await newOffer.save();

            res.json(offer);

            
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   GET api/offers
// @desc    Get wszystkie offerty
// @access  Public
router.get('/',  async (req, res) => {
    try {
        const offers = await Offer.find().sort({ date: -1 }).select('-image');
        res.json(offers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/offers/:id
// @desc    Get jedną oferte po ID
// @access  Public
router.get('/:id',  async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.id);
        if(!offer){
            return res.status(404).json({ msg: 'Nie znaleziono oferty' })
        }
        res.json(offer);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({ msg: 'Nie znaleziono oferty' })
        }
        res.status(500).send('Server Error');
    }
})


// @route   Delete api/offers/:id
// @desc    Usun oferte
// @access  Private
router.delete('/:id', auth,  async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.id);
        if(!offer){
            return res.status(404).json({ msg: 'Nie znaleziono oferty' })
        }

        //Sprawdzenie uzytkownika
        if(offer.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'Użytkownik niezautoryzowany!' });
        }

        await offer.remove();

        res.json({ msg: 'Oferta usunięta!'});
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({ msg: 'Nie znaleziono oferty' })
        }
        res.status(500).send('Server Error');
    }
});



module.exports = router;