
module.exports = function( apiURL ){
    "use strict";

    function nateLifeWantedComAPI( req, res, next ){
        // Pass off any requests that aren't for the API.
        console.log( req.url );
        if( req.url != apiURL ){
            next();
            return;
        }

        res.end( "API says hi!" );

    }
    
    return nateLifeWantedComAPI;
};

