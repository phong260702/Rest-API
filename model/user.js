const mongo = require('mongoose');

const userSchema = new mongo.Schema({
    name: {
        type: String,
        required: [true, "Need name"],
    },

    email: {
        type: String,
        unique: [true, "Email already exist"],
        lowercase: true,
        required: [true, "Need email"],
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} not valid email',
        }
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        required: [true, 'Nedd specific role'],
    },

    password: {
        type: String,
        required: true,
    },

    created: {
        type: Date,
        default: Date.now,
    }

});

module.exports = mongo.model('user', userSchema);




// var mongoose = require('mongoose'),
//     Schema = mongoose.Schema;

// /**
//  * User Schema
//  */
// var userSchema = new Schema({
//     fullName: {
//         type: String,
//         required: [true, "fullname not provided "],
//     },
//     email: {
//         type: String,
//         unique: [true, "email already exists in database!"],
//         lowercase: true,
//         trim: true,
//         required: [true, "email not provided"],
//         validate: {
//             validator: function (v) {
//                 return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
//             },
//             message: '{VALUE} is not a valid email!'
//         }

//     },
//     role: {
//         type: String,
//         enum: ["normal", "admin"],
//         required: [true, "Please specify user role"]
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     created: {
//         type: Date,
//         default: Date.now
//     }
// });

// module.exports = mongoose.model('User', userSchema);