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

router.get('/getUserById', (req, res, next) => {
    Model.getUserById(req.query.id)
        .then(data => {
            // filter out password before response is sent
            delete (data.password);
            res.json({ type: 'OK', content: data })
        }).catch(err => res.json({ type: "ERROR", content: err }))
})

router.get('/addToRudeMessages', (req, res, next) => {
    Model.getUserById(req.query.id, req.query.message)
        .then(data => {
            res.json({ type: 'OK', content: data })
        }).catch(err => res.json({ type: "ERROR", content: err }))
})

router.get('/addToVictoryGames', (req, res, next) => {
    Model.addToVictoryGames(req.query.id)
        .then(data => {
            res.json({ type: 'OK', content: data })
        }).catch(err => res.json({ type: "ERROR", content: err }))
})

router.get('/addToGames', (req, res, next) => {
    Model.addToGames(req.query.id)
        .then(data => {
            res.json({ type: 'OK', content: data })
        }).catch(err => res.json({ type: "ERROR", content: err }))
})

router.get("/update", (req, res) => {
    console.log("all query patams", req.query);
    if (req.query.rudeMessages)
        req.query.rudeMessages = req.query.rudeMessages.split(';');
    Model.updateUserById(req.query._id, req.query)
        .then(data => {
            res.json({ type: 'OK', content: data })
        }).catch(err => res.json({ type: "ERROR", content: err }))
})

router.get("/remove", (req, res) => {
    Model.removeUserById(req.query._id, req.query)
        .then(data => {
            res.json({ type: 'OK', content: data })
        }).catch(err => res.json({ type: "ERROR", content: err }))
})
router.get("/search", (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    Model.findUser(req.query).then((data) => {
        msg = { 'type': 'OK', 'content': data }
        res.json(msg)
    }).catch(err => {
        msg = { 'type': 'ERROR', 'content': err };
        res.json(msg)
    });
});

module.exports = router;