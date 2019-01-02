
const config = require("config");
module.exports = function(){
  process.on( 'uncaughtException', ( ex ) => 
  {
    console.log('We Got an uncoought exception: ', ex.message);
  });

  if ( !config.get( "jwtPrivateKey" ) )
  {
    console.log( "Fatal: jwtPrivateKey env. var. does not exist" );
    process.exit( 1 );
  }

}