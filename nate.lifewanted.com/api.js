
module.exports = function(){
    function nateLifeWantedComAPI( req, res, next ){
        // Pass off any requests that aren't for the API.
        if( req.url != '/api' ){
            next();
        }
    }
    
    res.simpleBody( 200, "Hello, API!", "text/plain" );
    
    return nateLifeWantedComAPI;
};

