
var site = (function(){
    "use strict";

    // Local objects.
    var site = {};
    var _handlers = {};

    /// Changes the page's active content to match the URL hash.
    ///
    /// The base of the URL hash is used as the handler name. If there is no
    /// handler registered for that name then an API call for that handler is
    /// made. If no handler is found by the API then the 404 page is shown.
    site.updateContent = function(){
        // First parse the hash URL.
        var hash = window.location.hash.substr( 1 );
        var root;
        if( !hash.length ){
            root = "home";
        }
        else {
            root = hash.split( '/', 2 )[0];
        }

        // Now send this off to the handler after parsing the parameters.
        _runContentHandler( root, _parseHashParams( hash ) );
    };

    /// Parses a hash string (sans #) into chunks more usable by the end content
    /// handler.
    ///
    /// The hash string will be parsed into the following object:
    ///     {
    ///         pathStr : "<original hash string>",
    ///         path    : [ <path split on '/'> ],
    ///         args    : { <query string parsed into an object> }
    ///     }
    ///
    /// @param {String} hash The hash string to parse.
    ///
    /// @return {Object} The parsed hash string.
    function _parseHashParams( hash ){
        var params    = { pathStr : hash };
        var argsStart = hash.indexOf( '?' );
        if( argsStart != -1 ){
            params.args = util.parseQueryString( hash.substr( argsStart + 1 ) );
        }
        return params;
    }

    /// Runs the named content handler and gives it the params passed in.
    ///
    /// If the content handler hasn't been loaded yet it will be loaded from the
    /// API.
    ///
    /// @param {String} handlerName The name of the content handler to run.
    /// @param {Object} params      A mapping of parameters.
    function _runContentHandler( handlerName, params ){
        // If we don't have this handler, load it.
        if( !util.exists( _handlers[ handlerName ] ) ){
            _loadContentHandler( handlerName, function( error ){
                if( error ){
                    _runErrorHandler( error );
                }
                else {
                    _runContentHandler( handlerName, params );
                }
            });
            return;
        }

        // This content handler exists, lets run it.
        _handlers[ handlerName ].run( params );
    }

    function _runErrorHandler( error ){
        console.log( error );
    }

    /// Loads a single content handler from the API.
    ///
    /// @param {String}   handlerName The name of the content handler to get.
    /// @param {Function} callback    The function to call when the API responds.
    function _loadContentHandler( handlerName, callback ){
        api.getContentHandler( handlerName, function( res ){
            if( res.error ){
                callback( res.error );
                return;
            }

            // We got the content handler, add it to the loaded ones.
            _handlers[ handlerName ] = res.contentHandler;
            callback();
        });
    }

    // Now that all the functions are defined lets set up our event handling.
    $(window).bind( 'hashchange', $.proxy( site, 'updateContent' ) );

    return site;
})();


$(function(){
    site.updateContent();
});

