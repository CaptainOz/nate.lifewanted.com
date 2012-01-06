
var server = null;
(function(){
    "use strict";

    // Import the connect framework.
    var connect  = require( 'connect' );
    connect.gzip = require( 'connect-gzip' ).gzip;

    // Load the configuration.
    // TODO: Make this an external config file.
    var hosts = [
        'nate.lifewanted.com'
    ];

    var virtualServers = [];
    for( var i in hosts ){
        var hostName  = hosts[i];
        var hostDir   = __dirname + '/' + hostName;
        var apiName   = 'api.' + hostName;
        var api       = require( hostDir + '/api.js' );
        var shared    = __dirname + '/shared';
        var logFormat = 'short';
        virtualServers.push(
            // Build the web host and link the API at /api.
            connect.vhost(
                hostName,
                connect(
                    connect.favicon(),
                    connect.logger( logFormat ),
                    connect.gzip(),
                    connect.static( hostDir + '/static' ),
                    connect.static( shared ),
                    connect.bodyParser(),
                    api( '/api' )
                )
            ),

            // Next build the API server at its own location for external use.
            connect.vhost(
                apiName,
                connect(
                    connect.logger( logFormat ),
                    connect.gzip(),
                    connect.bodyParser(),
                    api( '/' )
                )
            )
        );

        // Now actually create the servers and bind it to port 80.
        server = connect.apply( this, virtualServers );
        server.listen( 80 );
    }
})();

