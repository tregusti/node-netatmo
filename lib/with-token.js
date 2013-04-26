
function getToken( done ) {
  request.post("https://api.netatmo.net/oauth2/token", {
    form: {
      grant_type    : "password",
      client_id     : "517ad01e18775993fa000096",
      client_secret : "kAE6C0dqPSppcnEpoWZMb9cF61tJAl7g2WNutBEko1Aq6",
      username      : credentials.username,
      password      : credentials.password
    }
  }, function( err, res, body ) {
    if (err) throw err;
    
    var response = JSON.parse(body);
    done( response.access_token );
  });
}

module.exports = function withToken( username, password ) {
  request.post("https://api.netatmo.net/oauth2/token", {
    form: {
      grant_type    : "password",
      client_id     : "517ad01e18775993fa000096",
      client_secret : "kAE6C0dqPSppcnEpoWZMb9cF61tJAl7g2WNutBEko1Aq6",
      username      : credentials.username,
      password      : credentials.password
    }
  }, function( err, res, body ) {
    if (err) throw err;
    
    var response = JSON.parse(body);
    done( response.access_token );
  });
}