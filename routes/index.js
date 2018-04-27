const express = require("express");
const router = express.Router();
const csrf = require("csurf");
const passport = require("passport");

const csrfProtection = csrf();
router.use(csrfProtection);

const Product = require("../models/product");

/* GET home page. */
router.get("/", function(req, res, next) {
    Product.find(function(err, docs) {
        const productChunks = [];
        const chunkSize = 3;
        for (let i = 0; i < docs.length; i+= chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render("shop/index", { title: "Shopping Cart", products: productChunks });
    });
});

router.get("/user/signup", function(req, res, next) {
    const messages = req.flash("error");
    res.render("user/signup", {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post("/user/signup", passport.authenticate("local.signup", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/signup",
    failureFlash: true
}));

router.get("/user/profile", function(req, res, next) {
    res.render("user/profile");
});

router.get("user/signin", function(req, res, next) {
    const messages = req.flash("error");
    res.render("user/signin", {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post("user/signin", passport.authenticate("local-signin", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/signin",
    failureFlash: true
}));

module.exports = router;
