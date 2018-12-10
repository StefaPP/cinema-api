"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.MovieSchema = new Schema({
    title: {
        type: String,
        required: 'Enter a first name'
    },
    year: {
        type: String,
        required: 'Enter a last name'
    },
    time: {
        type: Number,
        required: 'Enter length',
    },
    lang: {
        type: String
    },
    country: {
        type: Number
    },
});
//# sourceMappingURL=movie.js.map