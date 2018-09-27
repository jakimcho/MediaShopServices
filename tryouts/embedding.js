const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/Embeddedplayground", { useNewUrlParser: true })
    .then(console.log("Connection established..."))
    .catch(err => console.log("Something has happened... ", err));

const authorSchema = new mongoose.Schema(
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
    });

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 15
        },
        author: authorSchema
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

async function createCourse(name, author) {
    const course = new Course(
        {
            name,
            author
        }
    );

    const result = await course.save();
    console.log('Course is save sucessfully....', course);
}

async function updateCourseAuthorSlow(courseId, authorName)  // fetch updated push
{
    const course = await Course.findById(courseId);
    course.author.name = authorName;
    await course.save();
    console.log("Course is updated");
}

async function updateCourseAuthor(courseId, authorName)  // update directly
{
    const course = await Course.update(
        {_id: courseId }, 
        { $set: {'author.name': authorName} 
    });
    console.log("Course is updated");
}

// createCourse("How to be good",
//     {
//         name: "Yakim Rachev",
//         bio: "bio-mio",
//         website: "fsdfs"
//     });

// createCourse("How to be good1",
//     new Author(
//         {
//             name: "Yakim Rachev"
//         })
// );


updateCourseAuthor("5bac99c0869ebe74888a786a", "Mitko");