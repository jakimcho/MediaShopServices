const express = require( 'express');
const coursesRoutes = require( './routes/courses' );
const mongoose = require( 'mongoose' );

mongoose.connect( 'mongodb://localhost/test' )
    .then( () => console.log( 'Connected to MongoDB' ) )
    .catch( ( err ) => console.log( 'Something happend while connecting to db: ', err) );

const app = express( );

app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

app.use( '/api/courses', coursesRoutes );


app.listen( 3000, 
            () => console.log( " Listening on port 3000... " ) );