const mongoose = require('mongoose');

const bookScheme = new mongoose.Schema({
    title: {
        type: String,
        minlength: 4,
        maxlength: 30,
        required: true
    },
    author: {
        type: String,
        minlength: 4,
        maxlength: 30,
        required: true
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        required: function () {
            return this.isPublished;
        }
    }

});

const Book = mongoose.model('Books', bookScheme);

module.exports = Book;