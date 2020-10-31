const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResault, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile/me
// @desc    Odbieranie informacji o profilu użytkownika
// @access  Private
router.get('/me', auth, async (req, res) => {
    try{
        const profile = await Profile.findOne({ user: req.user.id }).populate('user' , ['firstName', 'avatar'], User);

        if(!profile){
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);

    }   catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/profile
// @desc    Tworzenie/aktualizacja profilu użytkownika
// @access  Private
router.post(
    '/', 
    [
        auth, 
        [
            check('location', 'Lokalizacja jest wymagana!')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            bio,
            skills,
            location,
            youtube,
            twitter,
            facebook,
            linkedin,
            instagram
        } = req.body;

        //Stworzenie obiektu profilu
        const profileFields = {};
        profileFields.user = req.user.id;
        if(bio) profileFields.bio = bio;
        if(skills) {
            profileFields.skills = skills.split(',').map(skill  => skill.trim());
        }
        if(location) profileFields.location = location;
        //Stworzenie obiektu socjalnych aplikacji
        profileFields.social = {};
        if(youtube) profileFields.social.youtube = youtube;
        if(twitter) profileFields.social.twitter = twitter;
        if(facebook) profileFields.social.facebook = facebook;
        if(linkedin) profileFields.social.linkedin = linkedin;
        if(instagram) profileFields.social.instagram = instagram;

        try{
            let profile = await Profile.findOne({ user: req.user.id })

            if(profile){
                //Update
                profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields}, { new: true });
                return res.json(profile);
            };

            //Create
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);


        }   catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    }
)

// @route   GET api/profile
// @desc    Get wszystkich użytkowników
// @access  Private
router.get('/', async (req,res)=>{
    try {
        const profiles = await Profile.find().populate('user', ['firstName', 'avatar'], User);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   GET api/profile/user/:user_id
// @desc    Get profil po user ID
// @access  Private
router.get('/user/:user_id', async (req,res)=>{
    try {
        const profiles = await Profile.findOne({ user: req.params.user_id }).populate('user', ['firstName', 'avatar'], User);
        
        if(!profile) return res.status(400).json({ msg: 'Nie znaleziono profilu!'});

        
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'Nie znaleziono profilu!'});
        }
        res.status(500).send('Server Error');
    }
})

// @route   DELETE api/profile
// @desc    Usun profil, użytkownika i oferty
// @access  Private
router.get('/', auth, async (req,res)=>{
    try {
        await Profile.findOneAndRemove({ user: req.user.id });
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'Użytkownik usunięty' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;