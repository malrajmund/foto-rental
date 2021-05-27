const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const fileUpload = require("express-fileupload");
const { uuid } = require("uuidv4");
const stripe = require("stripe")(
  "sk_test_51Hyg1XABJcwzXikHCTNYDRWQn3cy6vGWDQI2HvD5D2V4TI43yUUgqeszqkx5Mgba1OUzXrQAJNmvuZwoolvZWZis00HGHxupQ5"
);

const User = require("../../models/User");
const Offer = require("../../models/Offer");
const config = require('config');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const sendgrid_api_key = config.get('sendgrid_api_key');

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: sendgrid_api_key
  }
}))

router.use(fileUpload());

// @route   POST api/offers
// @desc    Stwórz offerte
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("text", "Opis jest wymagany").not().isEmpty(),
      check("offerName", "Nazwa oferty jest wymagana").not().isEmpty(),
      check("category", "Kategoria jest wymagana").not().isEmpty(),
      check("pricePerDay", "Cena za dzień jest wymagana").not().isEmpty(),
      check("pricePerWeek", "Cena za tydzień jest wymagana").not().isEmpty(),
      check("file", "Zdjęcie jest wymagane")
        .custom((value, { req }) => {
          if (req.files.file.mimetype === "image/jpeg" && req.files.file.data) {
            return true; // return "non-falsy" value to indicate valid data"
          } else {
            return false; // return "falsy" value to indicate invalid data
          }
        })
        .withMessage("Obrazek jest wymagany"),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (req.files === null) {
      return res.status(400).json({ msg: "Nie dodano żadnych zdjęć" });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newOffer = new Offer({
        text: req.body.text,
        name: user.firstName + " " + user.lastName,
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

      const offer = await newOffer.save().then(offer => {
        transporter.sendMail({
          to: user.email,
          from: "fotorental.noreply@gmail.com",
          subject: "Potwierdzenie wystawienia oferty",
          html: "<h1>Pomyślnie wystawiono Twoją ofertę!</h1>"
        })
      }
      );

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
    const offers = await Offer.find({ status: "Aktywna" }).sort({ date: -1 });
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

// @route   GET api/myOffers
// @desc    Get wszystkie oferty uzytkownika
// @access  Public
router.get("/myOffers/:id", async (req, res) => {
  try {
    const offers = await Offer.find({ user: req.params.id }).sort({date: -1});
    res.json(offers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   Delete api/myOffers/:id
// @desc    Usun oferte
// @access  Private
router.delete("/myOffers/:id", auth, async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    const user = await User.findById(req.user.id).select("-password");
    if (!offer) {
      return res.status(404).json({ msg: "Nie znaleziono oferty" });
    }

    //Sprawdzenie uzytkownika
    if (offer.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Użytkownik niezautoryzowany!" });
    }
    offer.status = "Archiwalna";
    await offer.save().then(offer => {
      transporter.sendMail({
        to: user.email,
        from: "fotorental.noreply@gmail.com",
        subject: "Potwierdzenie usunięcia oferty",
        html: "<h1>Pomyślnie przeniesiono Twoją ofertę do archiwum " + offer.offerName + "!</h1>"
      })
    }
    );
    //await offer.remove();

    res.json(offer);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Nie znaleziono oferty" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/offers/:id
// @desc    Rezerwacja oferty
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    const user = await User.findById(req.user.id).select("-password");
    const owner = await User.findById(offer.user).select("-password");
    const newReservation = {
      user: user.id,
      message: req.body.message,
      totalCost: req.body.totalCost,
      name: user.firstName + " " + user.lastName,
      avatar: user.avatar,
      date: Date.now(),
      date_in: req.body.startDate,
      date_out: req.body.endDate,
    };
    offer.reservation.push(newReservation);
    offer.save().then(offer => {
      transporter.sendMail({
        to: user.email,
        from: "fotorental.noreply@gmail.com",
        subject: "Potwierdzenie rezerwacji oferty",
        html: "<h1>Pomyślnie zarezerwowano ofertę <i>" + offer.offerName + "</i> użytkownika " + owner.firstName + " " + owner.lastName + "!</h1>"
      });
      transporter.sendMail({
        to: owner.email,
        from: "fotorental.noreply@gmail.com",
        subject: "Potwierdzenie rezerwacji oferty",
        html: "<h1>Użytkownik " + user.firstName + " " + user.lastName + " dokonał rezerwacji Twojej oferty <i>" + offer.offerName + "</i>!</h1>"
      });
    });;
    res.json(offer);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/offers/:id
// @desc    Usuniecie rezerwacji
// @access  Private
router.patch("/:id", auth, async (req, res) => {
  try {
    const offer = await Offer.findById(req.body.params.offerId);
    const owner = await User.findById(req.user.id).select("-password");
    var user_id;
    offer.reservation.forEach(
      (x = (element, index, array) => {
        if (element._id == req.body.params.id) {
          element.status = 'odwołana';
          user_id = element.user;
        }
      })
    );
    const user = await User.findById(user_id).select("-password");
    offer.save().then(offer => {
      transporter.sendMail({
        to: user.email,
        from: "fotorental.noreply@gmail.com",
        subject: "Potwierdzenie odwołania rezerwacji",
        html: "<h1>Twoja rezerwacja oferty <i>" + offer.offerName + "</i> od użytkownika " + owner.firstName + " " + owner.lastName + " została odwołana przez właściciela!</h1>"
      })
      transporter.sendMail({
        to: owner.email,
        from: "fotorental.noreply@gmail.com",
        subject: "Potwierdzenie odwołania rezerwacji",
        html: "<h1>Pomyślnie odwołano rezerwację użytkownika " + user.firstName + " " + user.lastName + " Twojej oferty <i>" + offer.offerName + "</i>.</h1>"
      })
    });
    res.json(offer);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/offers/addToCart/
// @desc    Dodanie do koszyka
// @access  Private
router.put("/addToCart/:id", auth, async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    const user = await User.findById(req.user.id).select("-password");
    const newCartItem = {
      id: offer._id,
      offerName: offer.offerName,
      message: req.body.message,
      date_in: req.body.startDate,
      date_out: req.body.endDate,
      cost: req.body.price,
      file: req.body.offers.file.data,
    };
    user.cart.push(newCartItem);
    user.save();
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/offers/basket/
// @desc    Get wszystkie itemy z koszyka
// @access  Private
router.get("/basket/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    const cart = [];
    for (let i = 0; i < user.cart.length; i++) {
      cart[i] = user.cart[i];
    }
    res.json(cart);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PATCH api/basket/:id
// @desc    Usun pozycje z koszyka
// @access  Private
router.patch("/basket/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const cart = [];
    if (user.cart.length < 1) {
      user.cart = [];
      res.json(cart);
    }

    user.cart.forEach(function x(element, index, array) {
      if (element.id == req.params.id) {
        user.cart.splice(index, index + 1);
      } else {
        cart[index] = element;
      }
    });
    user.save();
    res.json(cart);
  } catch (err) {
    console.error("Error z backend: " + err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/offers/reservations;
// @desc    Get wszystkie rezerwacje uzytkownika
// @access  Private
router.get("/reservations/:id", async (req, res) => {
  try {
    const offers = await Offer.find().sort({ date: -1 });
    const userReservations = [];
    var iterate = 0;
    for (var i = 0; i < offers.length; i++) {
      const offer = await Offer.findById(offers[i]._id);
      for (var j = 0; j < offers[i].reservation.length; j++) {
        if (req.params.id == offers[i].reservation[j].user) {
          userReservations[iterate] = {
            id: offers[i]._id,
            res_id: offers[i].reservation[j]._id,
            status: offers[i].reservation[j].status,
            cost: offer.pricePerDay,
            name: offer.name,
            text: offer.text,
            offerName: offer.offerName,
            cost: offers[i].reservation[j].totalCost,
            date: offers[i].reservation[j].date,
            date_in: offers[i].reservation[j].date_in,
            date_out: offers[i].reservation[j].date_out,
            message: offers[i].reservation[j].message,
            file: offer.file.data,
          };
          iterate++;
        }
      }
    }
    res.json(userReservations);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/payment", async (req, res) => {
  const {
    id,
    res_id,
    offerName,
    text,
    name,
    status,
    date,
    date_in,
    date_out,
    message,
    cost,
    token,
    user_id,
  } = req.body;
  const idempotencyKey = uuid();
  const offer = await Offer.findById(id);
  const owner = await User.findById(offer.user).select("-password");
  var i_res;
  for (var i = 0; i < offer.reservation.length; i++) {
    if (offer.reservation[i].user == user_id) {
      if (offer.reservation[i]._id == res_id) {
        i_res = i;
      }
    }
  }
  const user = await User.findById(offer.reservation[i_res].user).select("-password");
  function changeStatus() {
    offer.reservation[i_res].status = "opłacona";
    offer.save()
      .then(offer => {
        transporter.sendMail({
          to: user.email,
          from: "fotorental.noreply@gmail.com",
          subject: "Potwierdzenie płatności",
          html: "<h1>Pomyślnie opłacono rezerwację oferty <i>" + offer.offerName + "</i> użytkownika " + owner.firstName + " " + owner.lastName + " w kwocie " + cost + "zł!</h1>"
        });
        transporter.sendMail({
          to: owner.email,
          from: "fotorental.noreply@gmail.com",
          subject: "Potwierdzenie płatności",
          html: "<h1>Użytkownik " + user.firstName + " " + user.lastName + " opłacił rezerwację Twojej oferty <i>" + offer.offerName + "</i> w kwocie " + cost + "zł!</h1>"
        });
      });
  }

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: cost * 100,
          currency: "pln",
          customer: customer.id,
          receipt_email: token.email,
          description: `purchase of ${offerName}`,
        },
        { idempotencyKey }
      );
    })
    .then(changeStatus())
    .then((result) => res.status(200).json(result))
    .catch((err = console.log(err)));

});

router.put("/search/results", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    var category = req.body.category;
    var text = req.body.text.split(" ").join("").toLowerCase();

    console.log("test", req.body);
    if (user.history.length > 2) {
      user.history.splice(1, 1);
    }
    user.history.push([text, category]);
    user.save();
    res.json(user);
  } catch (err) {
    console.error("Error z backend: " + err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
