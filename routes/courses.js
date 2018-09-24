const express = require('express');
const Course = require( '../models/course' );

const coursesRouter = express.Router( );


coursesRouter.get( '/', async ( req, res ) => 
{
    const courses = await Course.find();
    res.send( courses );
});

coursesRouter.post( '/', async ( req, res ) => 
{
    console.log("Post bofy: ", req.body);
    let course = new Course(
        {
            name: req.body.name,
            author: req.body.author,
            isPublished: req.body.isPublished,
            price: req.body.price
        });

    course = await course.save();
    res.send( course );
});

coursesRouter.put( '/:id', ( req, res ) => 
{
    res.send( `Update course: ${ req.params.id }`);
});

coursesRouter.delete( '/:id', ( req, res ) => 
{
    res.send( `Deleted course ${ req.params.id }` );
});

module.exports = coursesRouter;