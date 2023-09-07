const express = require('express');
const app = express();
const mongo = require('mongoose');
require('dotenv').config();
app.use(express.json());

mongo.set('strictQuery', false);
mongo.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message);
});

const db = mongo.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected to Database"));

const infoRouter = require('./routes/info');
const userRouter = require('./routes/user');
app.use(express.urlencoded({
    extended: true
}));


app.use('/info', infoRouter);
app.use('/user', userRouter);



app.listen(process.env.PORT || 3000, () => console.log('Server Started'));






// const express = require("express"),
//     app = express(),
//     mongoose = require("mongoose"),
//     userRoutes = require("./routes/user");
// require('dotenv').config();
// //Connect to database
// mongoose.set('strictQuery', false);
// try {
//     mongoose.connect(process.env.DATABASE_URL, {
//         useUnifiedTopology: true,
//         useNewUrlParser: true
//     });
//     console.log("connected to db");
// } catch (error) {
//     handleError(error);
// }
// process.on('unhandledRejection', error => {
//     console.log('unhandledRejection', error.message);
// });


// // parse requests of content-type - application/json
// app.use(express.json());
// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({
//     extended: true
// }));

// //using user route
// app.use('/user', userRoutes);

// //setup server to listen on port 8080
// app.listen(process.env.PORT || 8080, () => {
//     console.log("Server is live on port 8080");
// })