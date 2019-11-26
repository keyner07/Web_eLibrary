const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {type: String, required: true, max: 100},
    email: {type: String, required: true, unique: true, lowercase: true, index: { unique: true }},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true}
})

module.exports = mongoose.model('User', UserSchema);