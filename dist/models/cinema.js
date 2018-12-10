"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.CinemaSchema = new Schema({
    name: {
        type: String,
        required: 'Enter a first name'
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    founded: {
        type: Date
    }
});
//# sourceMappingURL=cinema.js.map