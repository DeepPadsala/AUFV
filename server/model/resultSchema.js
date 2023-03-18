const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true
    },
    pdf: {
        type: String,
        required: true
    }
});


const Result = mongoose.model('Result', resultSchema);
module.exports = Result;