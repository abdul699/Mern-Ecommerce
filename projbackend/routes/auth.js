const express = require("express");
var router = express.Router();
const {signout, signup, signin, isSignedIn } = require("../controllers/auth");
const { check, validationResult } = require('express-validator');

router.post("/signup", [
        check("name", "Name should be at least of 3 characters").isLength({ min: 3}),
        check("email", "Email is required").isEmail(),
        check("password", "Password should be at least 5 chars").isLength({min: 5}).matches(/\d/).withMessage("must contain a number")
    ], 
    signup
);

router.post("/signin", [
        check("email", "Email is required").isEmail(),
        check("password", "Password is required").isLength({min: 5})
    ], 
    signin
);

router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req, res) => {
    res.json(req.auth);
});

module.exports = router;