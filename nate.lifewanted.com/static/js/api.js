/// Library of API commands for nate.lifewanted.com.
///
/// With all API functions the `callback` parameter is overloaded as the async
/// flag as well. If you pass Boolean false instead of a function the request
/// will be made synchronously.
var api = (function(){
    "use strict";
    var api = {};

    // API static variables.
    var API_URL          = '/api',
        API_CONTENTTYPE  = 'application/json',
        API_RESPONSETYPE = 'json',
        API_METHOD       = 'POST';

    /// Performs actual API call to server.
    ///
    /// @param {String}   command  The command to call.
    /// @param {Object}   params   The parameters to send with the request.
    /// @param {Function} callback The function to call upon completion.
    ///
    /// @return {Object} The API call results if the request is synchronous.
    function _apiCall( command, params, callback ){
        // Set up some defaults for the parameters.
        if( callback && !util.isFunction( callback ) ){
            callback = null;
        }
        if( !util.isObject( params ) ){
            params = {};
        }

        // Build the API request object. This is so we can easilly handle
        // requests made synchronously and asynchronously without much overhead.
        params.command = command;
        var request = {
            callback : callback,
            response : null
        };

        // Now make the actual API call.
        $.ajax({
            // These parameters are all constant.
            url         : API_URL,
            contentType : API_CONTENTTYPE,
            dataType    : API_RESPONSETYPE,
            type        : API_METHOD,

            // If the callback is false we go synchronously and the data is JSON
            // encoded for extra goodness.
            async       : callback !== false,
            data        : JSON.stringify( params ),

            // The handler functions all act upon the request object.
            context     : request,
            complete    : _callComplete,
            error       : _callError,
            success     : _callSuccess
        });

        // And return the response (which will be null if the request is made
        // asynchronously.
        return request.response;
    }

    /// Handles calling the callback if there is one.
    function _callComplete(){
        if( this.callback ){
            this.callback( this.response );
        }
    }

    /// Stores the successfull response in the request object.
    ///
    /// @param {Object} response The response from the server.
    function _callSuccess( response ){
        this.response = response;
    }

    /// Stores an error response in the request object.
    ///
    /// The error will be used if it exists, otherwise the request status is
    /// stored.
    ///
    /// @param {XMLHttpRequest} jqXHR  Unused.
    /// @param {String}         status The status of the request.
    /// @param {String}         error  The error that occurred.
    function _callError( jqXHR, status, error ){
        this.response = { error : error || status };
    }

    /// Requests the named content handler from the server.
    ///
    /// @param {String}   handlerName The name of the handler to load.
    /// @param {Function} callback    The function to receive the response.
    ///
    /// @return {Object} The API response if the call was made synchronously.
    api.getContentHandler = function( handlerName, callback ){
        return _apiCall(
            'GetContentHandler',
            { handlerName : handlerName },
            callback
        );
    };

    return api;
})();
