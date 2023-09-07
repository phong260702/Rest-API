const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/user');
require('dotenv').config();

function sigup(req, res) {
    let user;

    try {
        user = new User({
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            password: bcrypt.hashSync(req.body.password, 8)
        });
    } catch (error) {
        res.json({ message: error.message, info: req.body });
        return;
    }

    user.save((error, user) => {
        if (error) {
            return res.status(500).json({ message: error.message });
        } else {
            res.status(200).json(user);
        }
    });
}

function sigin(req, res) {
    User.findOne({
        email: req.body.email,
    }).exec((error, user) => {
        if (error) return res.status(500).json({ message: error.message });
        if (!user) return res.status(404).json({ message: "User Not Found!" });

        const checkPass = bcrypt.compareSync(req.body.password, user.password);
        if (!checkPass) return res.status(401).json({
            accessToken: null,
            message: "Invalid Password",
        });

        const token = jwt.sign({
            id: user.id
        }, process.env.API_SECRET, {
            expiresIn: 86400
        });

        res.status(200).json({
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
            message: 'Login Success',
            access_token: token,
        });
    })
}

exports.signup = sigup;
exports.signin = sigin;





// exports.signup = (req, res) => {
//     const user = new User({
//         fullName: req.body.fullName,
//         email: req.body.email,
//         role: req.body.role,
//         password: bcrypt.hashSync(req.body.password, 8)
//     });

//     user.save((err, user) => {
//         if (err) {
//             res.status(500)
//                 .send({
//                     message: err.message
//                 });
//             return;
//         } else {
//             res.status(200)
//                 .send({
//                     message: "User Registered successfully"
//                 })
//         }
//     });
// };

// exports.signin = (req, res) => {
//     User.findOne({
//         email: req.body.email
//     })
//         .exec((err, user) => {
//             if (err) {
//                 res.status(500)
//                     .send({
//                         message: err.message
//                     });
//                 return;
//             }
//             if (!user) {
//                 return res.status(404)
//                     .send({
//                         message: "User Not found."
//                     });
//             }

//             //comparing passwords
//             var passwordIsValid = bcrypt.compareSync(
//                 req.body.password,
//                 user.password
//             );
//             // checking if password was valid and send response accordingly
//             if (!passwordIsValid) {
//                 return res.status(401)
//                     .send({
//                         accessToken: null,
//                         message: "Invalid Password!",
//                     });
//             }
//             //signing token with user id
//             var token = jwt.sign({
//                 id: user._id
//             }, process.env.API_SECRET, {
//                 expiresIn: 86400
//             });

//             //responding to client request with user profile success message and  access token .
//             res.status(200)
//                 .send({
//                     user: {
//                         id: user._id,
//                         email: user.email,
//                         fullName: user.fullName,
//                     },
//                     message: "Login successfull",
//                     accessToken: token,
//                 });
//         });
// };