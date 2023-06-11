const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:
    {
        type: String,
        required: true,
        unique: true
    },
    password:
    {
        type: String,
        required: true
    },
    company: String,
    address: String,
    plz: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
