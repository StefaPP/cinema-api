"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const movie_1 = require("../models/movie");
const Movie = mongoose.model('Movie', movie_1.MovieSchema);
class MovieController {
    addMovie(req, res) {
        let newMovie = new Movie(req.body);
        newMovie.save((err, movie) => {
            if (err) {
                res.send(err);
            }
            res.json(movie);
        });
    }
    getAllMovies(req, res) {
        Movie.find({}, (err, movies) => {
            if (err) {
                res.send(err);
            }
            res.json(movies);
        });
    }
    getMovieById(req, res) {
        Movie.findById(req.params.id, (err, movie) => {
            if (err) {
                res.send(err);
            }
            res.json(movie);
        });
    }
}
exports.MovieController = MovieController;
//# sourceMappingURL=movie.js.map