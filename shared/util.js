/// Library of utility functions for general usage.
var util = (function(){
    "use strict";
    var util = {};

    /// Detects if the given object is defined and not null.
    ///
    /// @param {*} a The object to test.
    ///
    /// @return {Boolean} True if the object is defined and not null.
    util.exists = function( a ){
        return Boolean( a !== undefined && a !== null );
    };

    /// Parses a query string into an mapping of name/value pairs.
    ///
    /// @param {String} queryStr The query string to parse.
    ///
    /// @return {Object} The parsed query string.
    util.parseQueryString = function( queryStr ){
        var parts  = queryStr.split( '&' );
        var params = {};
        for( var i in parts ){
            var nameValue = parts[i].split( '=' );
            params[ nameValue[0] ] = nameValue[1];
        }
        return params;
    };

    return util;
})();
