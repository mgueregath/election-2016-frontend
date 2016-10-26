"use_strict";

var Stg = {};

Stg.add = function(token, name) {
    localStorage.setItem("usr_tkn", token);
    localStorage.setItem("usr_name", name);
};

Stg.remove = function() {
    localStorage.removeItem("usr_tkn");
    localStorage.removeItem("usr_name");
};

Stg.get = function() {
    if (localStorage.getItem("usr_tkn")) {
        return "Bearer " + localStorage.getItem("usr_tkn");
    }
    return null;    
};

Stg.getName = function() {
    if (localStorage.getItem("usr_name")) {
        return localStorage.getItem("usr_name");
    }
    return null;    
};

