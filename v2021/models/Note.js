const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Note = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    date: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String,
        reuired: true
    }
})

module.exports = mongoose.model("content" , Note);