const mongoose = require( 'mongoose' ); 
const config = require( "config" );

module.exports = async function(){
  const mongoDBURL = config.get("mongodb.dbURL");
  try {
    console.log("Connecting to mongo: ", mongoDBURL);
    const connectionProps = { useCreateIndex: true, useNewUrlParser: true };
    await mongoose.connect( mongoDBURL, connectionProps);
    console.log( 'Connected to MongoDB' )
  } catch (error) {
    
    console.log( 'Something happend while connecting to db: ', err);
  }
}