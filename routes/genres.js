const _ = require( 'lodash' );
const express = require( 'express' );
const auth = require( '../midleware/auth' );
const { Genre, genreSchema } = require( '../models/genre' );

const router = express.Router();

router.post( '/', auth, async ( req, res ) =>
  { 
    const genre = new Genre( _.pick(req.body, [ "name" ] ) );
    await genre.save();

    res.send( genre );
  } );  

  module.exports = router;