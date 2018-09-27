const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            minlength: 4,
            maxlength: 30,
            required: true
        },
        author:
        {
            type: String,
            minlength: 4,
            maxlength: 30,
            required: true
        },
        isPublished:
        {
            type: Boolean,
            default: false
        },
        price:
        {
            type: Number,
            required: function () { return this.isPublished; }
        }

    }
);

const Course = mongoose.model('Courses', courseSchema);

module.exports = Course;