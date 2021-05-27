const express = require("express");
const Category = require("../../models/Category");
const Offer = require("../../models/Offer");
const router = express.Router();




// @route   POST api/categories
// @desc    Dodaj kategorię
// @access  Public
router.post('/', async (req, res) => {
    try {
        if (req.body.parent) {
            category = new Category({
                parent: req.body.parent,
                name: req.body.name,
            })
        } else {
            category = new Category({
                name: req.body.name,
            })
        }
        category = await category.save()
        res.json(category);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})



//@route    GET api/categories
//@desc     GET wszystkie kategorie
//@access   Public
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

//@route    GET api/categories/:id
//@desc     GET kategorię po ID
//@access   Public
router.get("/id", async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).select();
        res.json(category);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});


//NIE USUWAC
module.exports = router;