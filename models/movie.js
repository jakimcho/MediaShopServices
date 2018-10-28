const mongoose = require('mongoose');
const { Genre, genreSchema } = require('./genre');

const moviesSchema = new mongoose.Schema(
  {
    title:
    {
        type: String,
        minlength: 2,
        maxlength: 32,
        required: true
    },
    genre:
    {
        type: genreSchema,
        required: true
    }
  }
);

const Movie = mongoose.model("Movies", moviesSchema);

module.exports = Movie;