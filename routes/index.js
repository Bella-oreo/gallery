const express = require('express');
const router = express.Router();
const uuid = require('uuid');
let upload = require('./upload');
const url = require('url');
let Image = require('../models/images');

// Home Route
router.get('/', (req, res) => {
    Image.find({}, (err, images) => {
        if (err) console.log(err);
        res.render('index', { images: images, msg: req.query.msg });
    });
});

// Upload Route
router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.redirect(`/?msg=${err}`);
        } else {
            console.log(req.file);
            if (req.file == undefined) {
                res.redirect('/?msg=Error: No file selected!');
            } else {
                // Create new image object
                let newImage = new Image({
                    name: req.file.filename,
                    size: req.file.size,
                    path: 'images/' + req.file.filename
                });

                // Save the uploaded image to the database
                newImage.save((err) => {
                    if (err) console.log(err);
                    res.redirect('/?msg=File uploaded successfully');
                });
            }
        }
    });
});

module.exports = router;
