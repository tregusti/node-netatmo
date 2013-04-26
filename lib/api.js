const BASE_URL = "https://api.netatmo.net";
const API_URL = BASE_URL + "/api/";

var request   = require("request");

var store = [];

function responseWrapper( done ) {
  return function(err, res, body) {
    if (err) return done( err );
  
    try {
      var response = JSON.parse(body);
    } catch (ex) {
      return done( ex );
    }
    
    if (response.status !== "ok") {
      done( response.error );
    } else {
      done( null, response.body );
    }
  };
}

function getToken( instance, done ) {
  var pdata = store[instance.id];
  if (pdata.token && pdata.token.value)
    return done( pdata.token.value );

  // TODO: Handle when new method invokation comes when trying to load a token.
  
  pdata.token = null;
  
  request.post(BASE_URL + "/oauth2/token", {
    form: {
      grant_type    : "password",
      client_id     : "517ad01e18775993fa000096",
      client_secret : "kAE6C0dqPSppcnEpoWZMb9cF61tJAl7g2WNutBEko1Aq6",
      username      : store[instance.id].username,
      password      : store[instance.id].password
    }
  }, function( err, res, body ) {
    // TODO: Wrap parsing error in custom error.
    var response = JSON.parse(body);
    
    pdata.token = {
      value: response.access_token
    };
    
    done( pdata.token.value );
  });
}

function query( instance, method, done ) {
  getToken( instance, function( token ) {
    request( API_URL + method + "?access_token=" + token, responseWrapper(function( err, json ) {
      if (err) throw err;
      
      done( json );
    }));
  });
}

function NetAtmo( username, password ) {
  Object.defineProperties(this, {
    "id": {
      value: store.length
    }
  });
  
  // Store as private data without exposing it to the consumer
  store[this.id] = {
    username: username,
    password: password
  };
}

NetAtmo.prototype.user = function( done ) {
  query( this, "getuser", done );
}
NetAtmo.prototype.devices = function( done ) {
  query( this, "devicelist", done );
}

module.exports = NetAtmo;
