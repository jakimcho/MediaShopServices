const express = require( 'express' );
const config = require( "config" );

function startServer(){
    require("./startup/logging")();
    require( './startup/db-connect' )(); 
    const app = express( );
    require( './startup/app-routers' )(app);
    
    const port = config.get("app.port");
    if( app.get("env") === "test" ) return app;
    return app.listen( port, 
        () => console.log( `Listening on port ${port}... ` ) );
}

startServer();

module.exports = startServer;


