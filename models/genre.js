const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        }
    });

const Genre = mongoose.model("Genres", genreSchema);

module.exports.Genre = Genre;
module.exports.genreSchema = genreSchema;