const express = require("express");
const router = express.Router();
const {
  check,
  validationResault,
  validationResult,
} = require("express-validator");
const auth = require("../../middleware/auth");
const fileUpload = require("express-fileupload");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Offer = require("../../models/Offer");

router.use(fileUpload());

// @route   POST api/offers
// @desc    Stwórz offerte
// @access  Private
router.post(
  "/",
  [auth, [check("text", "Opis jest wymagany").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (req.files === null) {
      return res.status(400).json({ msg: "Nie dodano żadnych zdjęć" });
    }

    /*const uploadedFile = req.files.file;
    uploadedFile.mv(
      `../foto-rental/client/public/uploads/${uploadedFile.name}`,
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
        res.json({
          fileName: uploadedFile.name,
          filePath: `/uploads/${uploadedFile.name}`,
        });
      }
    );*/
    try {
      const user = await User.findById(req.user.id).select("-password");

      const newOffer = new Offer({
        text: req.body.text,
        name: user.name,
        offerName: req.body.offerName,
        category: req.body.category,
        avatar: user.avatar,
        pricePerDay: req.body.pricePerDay,
        pricePerWeek: req.body.pricePerWeek,
        annulPriceTo: req.body.annulPriceTo,
        annulPriceAbove: req.body.annulPriceAbove,
        user: req.user.id,
        file: req.files.file,
      });

      const offer = await newOffer.save();

      res.json(offer);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/offers
// @desc    Get wszystkie offerty
// @access  Public
router.get("/", async (req, res) => {
  try {
    const offers = await Offer.find().sort({ date: -1 }).select("-image");
    res.json(offers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/offers/:id
// @desc    Get jedną oferte po ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({ msg: "Nie znaleziono oferty" });
    }
    res.json(offer);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Nie znaleziono oferty" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   GET api/offers/myOffers
// @desc    Get wszystkie oferty uzytkownika
// @access  Public
router.get("/myOffers/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const offers = await Offer.find({ user: req.params.id });

    res.json(offers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   Delete api/offers/:id
// @desc    Usun oferte
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({ msg: "Nie znaleziono oferty" });
    }

    //Sprawdzenie uzytkownika
    if (offer.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Użytkownik niezautoryzowany!" });
    }

    await offer.remove();

    res.json({ msg: "Oferta usunięta!" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Nie znaleziono oferty" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
