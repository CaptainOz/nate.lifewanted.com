
var servers = {};
(function(){
    "use strict";
    var connect = require( 'connect' );

    var hosts = [
        'nate.lifewanted.com'
    ];

    for( var i in hosts ){
        var hostName = hosts[i];
        servers[hostName] = connect(
            connect.vhost(
                hostName,
                connect.createServer(
                    connect.favicon(),
                    connect.logger(),
                    connect.static( __dirname + '/' + hostName + '/static' )
                )
            )
        ).listen( 80 );
    }
})();

