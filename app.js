const morgan = require('morgan');
const cors = require('cors');
const config = require( "config" );
const express = require( 'express');
const mongoose = require( 'mongoose' ); 
const coursesRoutes = require( './routes/courses' );
const moviesRouter = require( './routes/movies' );
const genresRouter = require( './routes/genres' );
const usersRouter = require( './routes/users' );
const authRouter = require( './routes/authenticate' );
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

process.on( 'uncaughtException', ( ex ) => 
{
  console.log('We Got an uncoought exception: ', ex.message);
});

if ( !config.get( "jwtPrivateKey" ) )
{
    console.log( "Fatal: jwtPrivateKey env. var. does not exist" );
    process.exit( 1 );
}

const port = config.get("app.port");
const mongodb_url = `${config.get( "mongodb.url" )}:${config.get("mongodb.port")}`;
const mongodb = `${mongodb_url}/${config.get("mongodb.dbName")}"`;

console.log("Connecting to mongo: ", mongodb);
mongoose.connect( mongodb, { 
        useCreateIndex: true, 
        useNewUrlParser: true 
    })
    .then( () => console.log( 'Connected to MongoDB' ) )
    .catch( ( err ) => console.log( 'Something happend while connecting to db: ', err) );

const app = express( );
app.get('env') === "development" && app.use(morgan("dev"));
app.use( cors() );
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use( '/api/courses', coursesRoutes );
app.use( '/api/movies', moviesRouter );
app.use( '/api/users', usersRouter );
app.use( '/api/genres', genresRouter );
app.use( '/api/auth', authRouter );

app.listen( port, 
            () => console.log( `Listening on port ${port}... ` ) );