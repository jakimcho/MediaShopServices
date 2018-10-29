const config = require( "config" );
const express = require( 'express');
const coursesRoutes = require( './routes/courses' );
const moviesRouter = require( './routes/movies' );
const usersRouter = require( './routes/users' );
const authRouter = require( './routes/authenticate' );
const genresRouter = require( './routes/genres' );
const mongoose = require( 'mongoose' );

if ( !config.get( "jwtPrivateKey" ) )
{
    console.log( "Fatal: jwtPrivateKey env. var. does not exist" );
    process.exit( 1 );
}

mongoose.connect( 'mongodb://localhost/test', { 
        useCreateIndex: true, 
        useNewUrlParser: true 
    })
    .then( () => console.log( 'Connected to MongoDB' ) )
    .catch( ( err ) => console.log( 'Something happend while connecting to db: ', err) );

const app = express( );

app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

app.use( '/api/courses', coursesRoutes );
app.use( '/api/movies', moviesRouter );
app.use( '/api/users', usersRouter );
app.use( '/api/genres', genresRouter );
app.use( '/api/auth', authRouter );


app.listen( 3000, 
            () => console.log( " Listening on port 3000... " ) );