const _ = require( 'lodash' );
const asyncMiddleware = require( '../midleware/async' );
const express = require( 'express' );
const auth = require( '../midleware/auth' );
const { Genre, genreSchema } = require( '../models/genre' );

const router = express.Router();

router.get( '/', asyncMiddleware( async (req, res ) => 
{
  const genres = await Genre.find().sort( 'name' );
  res.send( genres );
}));

router.post( '/', auth, asyncMiddleware( async ( req, res ) =>
  { 
    const genre = new Genre( _.pick(req.body, [ "name" ] ) );
    await genre.save();

    res.send( genre );
  } ));  

  module.exports = router;