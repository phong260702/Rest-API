const mongo = require('mongoose');

async function getInfo(req, res, next) {
    if (!mongo.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send("Invalid Id");

};

module.exports = getInfo;