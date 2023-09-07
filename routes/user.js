const express = require('express');
const router = express.Router();
const { signin, signup } = require('../controllers/auth.control');
const verifyToken = require('../controllers/authen.control');

router.post('/register', signup, (req, res) => {

});

router.post('/login', signin, (req, res) => {

});

router.get('/hiddencontent', verifyToken, (req, res) => {
    if (!req.user) return res.status(403).json({ message: "invalid token" });
    if (req.user.role === 'admin') res.status(200).json({ message: "Access Granted!" })
    else {
        res.status(403).json({ message: "Access Denied!" })
    }
});


module.exports = router;


// var express = require("express"),
//     router = express.Router(),
//     verifyToken = require('../controllers/authen.control'),
//     {
//         signup,
//         signin
//     } = require("../controllers/auth.control");

// router.post("/register", signup, function (req, res) {

// });

// router.post("/login", signin, function (req, res) {

// });

// router.get("/hiddencontent", verifyToken, function (req, res) {
//     // console.log(req.user);
//     if (!req.user) {
//         return res.status(403)
//             .send({
//                 message: "Invalid JWT token"
//             });
//     }
//     if (req.user.role === "admin") {
//         res.status(200)
//             .send({
//                 message: "Congratulations! but there is no hidden content"
//             });
//     } else {
//         res.status(403)
//             .send({
//                 message: "Unauthorised access"
//             });
//     }
// });

// module.exports = router;