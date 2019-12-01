const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BookSchema = new Schema({
    title: {type: String, required: true, max: 500},
    author: {type: String, lowercase: true, default: 'Unknown'},
    urlTxt: {type: String, required: true},
    urlMp3: {type: String, required: true},
    isActive: {type: Boolean, default: true},
    createdBy: {type: Schema.Types.ObjectId, ref: "User", required: true}
})

module.exports = mongoose.model('Book', BookSchema);