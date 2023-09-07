const mongo = require('mongoose');

const infoSchema = new mongo.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 255,
    },
    birthday: {
        type: String,
        maxlength: 255,
        default: Date.now,
    },
    place: {
        type: String,
        default: 'N/A',
    },
    prefer_name: {
        type: String,
        maxlength: 255,
        default: 'N/A',
    },
});

module.exports = mongo.model('info', infoSchema);
