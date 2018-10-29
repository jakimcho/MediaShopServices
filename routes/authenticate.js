const express = require( 'express' );
const { User } = require( "../models/user" );
const bcrypt = require( "bcrypt" );
const Joi = require( "joi" )
const _ = require( "lodash" );

const authenticateionRouter = express.Router();

authenticateionRouter.post( "/", async (req, res) => 
  {
    let user = await User.findOne( {  email: req.body.email } );
    if ( !user ) return res.status( 400 ).send( "No such username or password." );

    const { error } = await validate( req.body );
    if ( error ) return res.status( 400 ).send( error.details[0].message );

    const result = await bcrypt.compare( req.body.password, user.password );
    const webTokken = user.generateToken();

    if ( result ) 
    {
      res.header( 'x-auth-token', webTokken ).send(webTokken);
    }else
    {
      res.send("You may NOT pass!");
    }
  }
);

function validate( user ){
  const schema = 
	{
		email: Joi.string( )
							.min( 5 )
							.max( 255 )
							.required()
							.email( ),

		password: Joi.string( )
									.min( 5 )
									.max( 255 )
									.required( )
  }

  return Joi.validate( user, schema );
}

module.exports = authenticateionRouter;