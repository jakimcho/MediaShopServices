
const _ = require( "lodash" );
const { User, validate } = require( "../models/user" );
const express = require( "express" );
const bcrypt = require( "bcrypt" );
const router = express.Router( );

router.post( "/" , async ( req, res ) => 
  {
    console.log("Got request for registering user: ", req.body);
    const { error } = validate( req.body );
    if ( error ) 
    {
      return res.status( 400 )
                .send( error.details[0]
                            .message );
    }

    let user = await User.findOne( {  email: req.body.email } );
    if ( user ) 
    { 
      return res.status( 400 )
                .send( "Such user already exists." );
    }

    user = new User( _.pick( req.body, [ 'firstName', 
                                          'sirName', 
                                          'email', 
                                          'password', 
                                          'city', 
                                          'country', 
                                          'address', 
                                          'zip' ] ) );
    const salt = await bcrypt.genSalt( 10 );
    user.password = await bcrypt.hash( user.password, salt );
    await user.save( );
    
    const webtoken = user.generateToken();
    res
        .header( 'x-auth-token', webtoken )
        .header("access-control-expose-headers", "x-auth-token")
        .send( _.pick( user, [ 'firstName', 
                                'sirName', 
                                'email',  
                                'city', 
                                'country', 
                                'address', 
                                'zip' ] ) );
  }
);

router.get( "/", async ( req, res ) => 
  {
    const users = await User.find();
    if (null === users || _.isEmpty(users)){
      res.status(400).send("No users found");
    }else{
      res.status(200).send(users);
    }
  }
);

module.exports = router;
