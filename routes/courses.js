const express = require('express');

const coursesRouter = express.Router( );

coursesRouter.get( '/', ( req, res ) => 
{
    res.send("Hello Courses");
});

coursesRouter.post( '/', ( req, res ) => 
{
    res.send("Post course");
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