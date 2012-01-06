
var servers = {};
(function(){
    "use strict";
    var connect = require( 'connect' );
    connect.gzip = require( 'connect-gzip' );

    var hosts = [
        'nate.lifewanted.com'
    ];

    for( var i in hosts ){
        var hostName = hosts[i];
        var hostDir  = __dirname + '/' + hostName;
        servers[hostName] = connect(
            connect.vhost(
                hostName,
                connect(
                    connect.favicon(),
                    connect.logger(),
                    connect.gzip(),
                    connect.staticProvider( hostDir + '/static' ),
                    require( hostDir + '/api.js' )()
                )
            )
        ).listen( 80 );
    }
})();

