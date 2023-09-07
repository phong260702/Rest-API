const jwt = require('jsonwebtoken');
const User = require('../model/user');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, function (error, decode) {
            if (error) {
                req.user = undefined;
                next();
                return;
            }
            User.findOne({
                _id: decode.id,
            }).exec((error, user) => {
                if (error) res.status(500).json({ message: error.message });
                else {
                    req.user = user;
                    next();
                }
            })
        });
    } else {
        req.user = undefined;
        next();
    }
};

module.exports = verifyToken;




// const verifyToken = (req, res, next) => {
//     if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
//         jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, function (err, decode) {
//             if (err) {
//                 req.user = undefined;
//                 next();
//                 return;
//             }
//             User.findOne({
//                 _id: decode.id
//             })
//                 .exec((err, user) => {
//                     if (err) {
//                         res.status(501)
//                             .send({
//                                 message: err
//                             });
//                     } else {
//                         req.user = user;
//                         next();
//                     }
//                 })
//         });
//     } else {
//         req.user = undefined;
//         next();
//     }
// };
// module.exports = verifyToken;