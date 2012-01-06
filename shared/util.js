/// Library of utility functions for general usage.
var util = (function(){
    var util = {};

    /// Detects if the given object is defined and not null.
    ///
    /// @param {*} a The object to test.
    ///
    /// @return {Boolean} True if the object is defined and not null.
    util.exists = function( a ){
        return Boolean( a !== undefined && a !== null );
    };

    return util;
});
