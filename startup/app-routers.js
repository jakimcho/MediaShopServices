const express = require( 'express' );
const morgan = require('morgan');
const cors = require('cors');
const coursesRoutes = require( '../routes/courses' );
const moviesRouter = require( '../routes/movies' );
const genresRouter = require( '../routes/genres' );
const usersRouter = require( '../routes/users' );
const authRouter = require( '../routes/authenticate' );
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

module.exports = function(app) {
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
}