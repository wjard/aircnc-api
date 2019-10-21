const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    birthday: Date,
    active: Boolean,
});

module.exports = mongoose.model('User', UserSchema);