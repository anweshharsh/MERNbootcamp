var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const {signout, signup, signin, isSignedIn} = require("../controllers/auth");



router.post("/signup",
[
    check("name","Name should be at least 3 characters").isLength({ min: 3 }),
    check("email","E-mail is required").isEmail(),
    check("password","Password should beMin 3 characters").isLength({ min: 3 }),
] ,signup
);

router.post("/signin",
[
    check("email","E-mail is required").isEmail(),
    check("password","Password is required").isLength({ min: 1 }),
] ,signin
);

router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req, res) => {
    res.send("A protected route")
});



module.exports = router;