const mongoose = import(mongoose);

var UserScheme = new mongoose.Schema({
    name: String,
    score: Number,
    email: String
});

module.exports = mongoose.model('User', UserScheme );

