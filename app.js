const express = require( 'express' );
const config = require( "config" );

    require("./startup/logging")();
    require( './startup/db-connect' )(); 
    const app = express( );
    require( './startup/app-routers' )(app);

    const port = config.get("app.port");
    const server = app.listen( port, 
                () => console.log( `Listening on port ${port}... ` ) );

module.exports = server;


