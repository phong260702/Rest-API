const express = require('express');
const { isValidObjectId } = require('mongoose');
const router = express.Router();
const Info = require('../model/info');

// get all
router.get('/', async (req, res) => {
    try {
        const infos = await Info.find();
        res.json(infos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get one
router.get('/:id', getInfo, async (req, res) => {
    res.json(res.info);
});


// create
router.post('/', async (req, res) => {
    const info = new Info({
        name: req.body.name,
        birthday: req.body.birthday,
        place: req.body.place,
        prefer_name: req.body.prefer_name,
    });
    try {
        const newInfo = await info.save();
        res.status(201).json(newInfo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// update
router.patch('/:id', getInfo, async (req, res) => {
    if (req.body.name) {
        res.info.name = req.body.name;
    }
    // if (req.body.birthday) {
    //     res.info.birthday = req.body.birthday;
    // }
    // if (req.body.place) {
    //     res.info.place = req.body.place;
    // }
    // if (req.body.prefer_name) {
    //     res.info.prefer_name = req.body.prefer_name;
    // }


    try {
        const updateInfo = await res.info.save();
        res.json(updateInfo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

// delete
router.delete('/:id', getInfo, async (req, res) => {
    try {
        await res.info.remove();
        res.json(res.info);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getInfo(req, res, next) {
    let temp;
    try {
        temp = await Info.findById(req.params.id);
        if (temp == null) {
            return res.status(404).json({ message: "Invalid ID!" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.info = temp;
    next()
}


module.exports = router;