const mongoose = require('mongoose');

var userScheme = new mongoose.Schema({
    name: String,
    password: String,
    score: Number
});

module.exports = mongoose.model('User',userScheme);