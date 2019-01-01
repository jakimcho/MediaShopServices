const mongoose = require( 'mongoose' );
const jwt = require( 'jsonwebtoken' );
const config = require( "config" );
const Joi = require( 'joi' );
const _ = require('lodash');

const userScheme = new mongoose.Schema(
	{
		email: 
		{
			type: String,
			required: true,
			minlength: 5,
			maxlength: 255,
			unique: true
		},

		firstName:
		{
			type: String,
			required: true,
			trim: true,
			minlength: 3,
			maxlength: 50
		},

		sirName:
		{
			type: String,
			required: true,
			trim: true,
			minlength: 3,
			maxlength: 50
		},

		password: 
		{
      type:String,
      required: true,
			minlength: 5,
			maxlength: 255
		},

		city:
		{
			type: String,
			required: true,
			trim: true,
			minlength: 3,
			maxlength: 50
		},

		country:
		{
			type: String,
			required: true,
			trim: true,
			minlength: 3,
			maxlength: 50
		},

		zip:
		{
			type: String,
			required: true,
			trim: true,
			minlength: 4,
			maxlength: 5
		},

		address:
		{
			type: String,
			required: false,
			trim: true,
		}
	} 
);

userScheme.methods.generateToken = function()
{
	const user = _.pick(this, [ "_id", 
															"firstName", 
															"sirName", 
															"email", 
															"city", 
															"country", 
															"address", 
															"zip" ]);
	const webTokken = jwt.sign( user, config.get( "jwtPrivateKey" ));
	return webTokken;
}

const User = mongoose.model( "User", userScheme );

function validateUser( user )
{
	const schema = 
	{
    email: Joi.string( )
                        .min( 5 )
                        .max( 50 )
                        .required()
                        .email( ),
                        
	firstName: Joi.string( )
						.min( 3 )
						.max( 50 )
						.required( ),

    sirName: Joi.string( )
                          .min( 3 )
                          .max( 50 )
                          .required( ),

    password: Joi.string( )
                          .min( 5 )
                          .max( 255 )
                          .required( ),
    city: Joi.string( )
                      .min( 3 )
                      .max( 50 )
                      .required( ),

    country: Joi.string( )
                          .min( 3 )
                          .max( 50 )
                          .required( ),
    zip: Joi.string( )
                      .min( 4 )
                      .max( 5 )
                      .required( ),

		address: Joi.string( )
								.allow("")
								.optional()
  }
	return Joi.validate( user, schema );;
}


module.exports.User = User;
module.exports.validate = validateUser;