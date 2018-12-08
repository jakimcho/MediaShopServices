const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/playground", { useNewUrlParser: true } )
    .then(() => console.log("Sucsessfully connected...."))
    .catch((err) => console.log("Something bad has happened... ", err))

const Author = mongoose.model('Author', new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 15
        },
        bio: String,
        website: String
    })
);

const Course = mongoose.model('Course', new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 15
        },
        author:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Author'
        }
    })
);

async function createAuthor(name, bio, website) {
    const author = new Author(
        {
            name, bio, website
        });
    const result = await author.save();
    console.log(result);
}

async function createCourse(name, author)
{
    const course = new Course(
        {
            name,
            author
        }
    );

    const result = await course.save();
    console.log('Course is save sucessfully....', course);
}

async function getCourses()
{
    const courses = await Course.find()
                                .populate('author', 'name -_id');

    console.log('Courses are fetched...', courses);
    return courses;
}

// createAuthor("Yakim", "Блабла", "http://www.jrachev.com");
// createCourse("Code with me", "5bac8e785e712a67a288dfff");
getCourses();
