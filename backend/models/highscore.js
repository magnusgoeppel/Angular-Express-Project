const mongoose = require('mongoose');

const HighScoreSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('HighScore', HighScoreSchema);
