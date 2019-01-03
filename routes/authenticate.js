const express = require( 'express' );
const { User } = require( "../models/user" );
const bcrypt = require( "bcrypt" );
const Joi = require( "joi" )
const _ = require( "lodash" );

const authenticateionRouter = express.Router();

authenticateionRouter.post( "/", async (req, res) => 
  {
    let user = await User.findOne( {  email: req.body.email } );
    console.log("user to login: ", req.body);
    if ( !user ) return res.status( 400 ).send( { error : "No such username or password." } );

    const { error } = await validate( req.body );
    if ( error ) return res.status( 400 ).send( { error: error.details[0].message } );

    const result = await bcrypt.compare( req.body.password, user.password );
    if ( result ) 
    {
      const webTokken = user.generateToken();
      res.header( 'x-auth-token', webTokken )
          .status(200)
          .send({token: webTokken});
    }else
    {
      res.status(404).send({error: "You may NOT pass!"});
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