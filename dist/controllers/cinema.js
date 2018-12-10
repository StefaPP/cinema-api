"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const cinema_1 = require("../models/cinema");
const Cinema = mongoose.model('Cinema', cinema_1.CinemaSchema);
class CinemaController {
    addCinema(req, res) {
        let newCinema = new Cinema(req.body);
        newCinema.save((err, Cinema) => {
            if (err) {
                res.send(err);
            }
            res.json(Cinema);
        });
    }
    getAllCinemas(req, res) {
        Cinema.find({}, (err, Cinemas) => {
            if (err) {
                res.send(err);
            }
            res.json(Cinemas);
        });
    }
    getCinemaById(req, res) {
        Cinema.findById(req.params.id, (err, Cinema) => {
            if (err) {
                res.send(err);
            }
            res.json(Cinema);
        });
    }
}
exports.CinemaController = CinemaController;
//# sourceMappingURL=cinema.js.map