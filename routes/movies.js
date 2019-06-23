const express = require('express');
const Movie = require('../models/movie');
const {Genre} = require('../models/genre');

const coursesRouter = express.Router();

coursesRouter.get("/", async (req, res) => {
    const movies = await getAllmovies();
    res.send(movies).status(200);
});

coursesRouter.post("/", async (req, res) => {
    const targetMovie = req.body;
    const result = await createMovie(targetMovie);
    if (result === -1 )
    {
        res.status(404).send("No such movie");
    }else{
        res.send(result);
    }
});

coursesRouter.get("/:id", async (req, res) => {

});

coursesRouter.put("/:id", async (req, res) => {

});

coursesRouter.delete("/:id", async (req, res) => {

});


// helper methods:

async function getAllmovies() {
    const movies = await Movie.find();
    console.log("Movies are fetched...");
    return movies;
}

async function createMovie(targetMovie) {
    const genre = await Genre.findById(targetMovie.genreId);
    if (!genre) {
        return -1;
    }

    const movie = new Movie(
        {
            title: targetMovie.title,
            genre:
            {
                _id: genre._id,
                name: genre.name
            }
        }
    );

    const res = await movie.save();
    console.log("Movie is persisted: ", res);
    return movie;
}

module.exports = coursesRouter;