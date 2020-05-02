const express = require('express');
const router = express.Router();
const path = require("path");
const Model = require(path.join(__dirname, '..', 'model', 'model.js'));

router.get('/getAllCountries', (req, res, next) => {
    // countries = [{ country: 'Israel', coordinates: { lat: 0, lng: 0 } }, { country: 'USA', coordinates: { lat: 10, lng: 10 } }];
    Model.showDetaels()
        .then(data => {
            return data.map((e, i) => {
                console.log(e);
                return { country: e.country, coordinates: { lat: e.lat, lng: e.lng } }
            })
        }).then(countries => res.json({ type: 'OK', content: countries }))
        .catch(err => console.log(err))
});

module.exports = router;