import Oidc from 'oidc-client';
import 'babel-polyfill';
import axios from 'axios';

var BACKEND_URL;
var FRONTEND_URL;
if (process.env.NODE_ENV === "development") {
  BACKEND_URL = "https://localhost:5001";
  FRONTEND_URL = "http://localhost:8080";
}
if (process.env.NODE_ENV === "production") {
  BACKEND_URL = "https://team-2-backend.herokuapp.com";
  FRONTEND_URL = "https://team2-frontend.herokuapp.com";
}

const settings = {
    authority: BACKEND_URL,
    client_id: "Team2Frontend",
    redirect_uri: FRONTEND_URL + "/callback.html",
    post_logout_redirect_uri: FRONTEND_URL + "/logout.html",
    response_type: "code",
    scope: "team2backendAPI openid profile",
    automaticSilentRenew: true,
    includeIdTokenInSilentRenew: true,
    filterProtocolClaims: true,
    loadUserInfo: true,
}

var mgr = new Oidc.UserManager(settings)

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.INFO;

mgr.events.addUserLoaded(function (user) {  
  console.log('New User Loaded：', arguments);
  axios.interceptors.request.use(function(config) {
    config.headers.Authorization = "Bearer " + user.access_token;
    return config;
  });
  console.log('Acess_token: ', user.access_token)
});

mgr.events.addAccessTokenExpiring(function () {
  console.log('AccessToken Expiring：', arguments);
});

mgr.events.addAccessTokenExpired(function () {
  console.log('AccessToken Expired：', arguments);  
  alert('Session expired. Going out!');
  mgr.signoutRedirect().then(function (resp) {
    console.log('signed out', resp);
  }).catch(function (err) {
    console.log(err)
  })
});

mgr.events.addSilentRenewError(function () {
  console.error('Silent Renew Error：', arguments);
});

mgr.events.addUserSignedOut(function () {
  alert('Going out!');
  console.log('UserSignedOut：', arguments);  
  mgr.signoutRedirect().then(function (resp) {
    console.log('signed out', resp);
  }).catch(function (err) {
    console.log(err)
  })
});

class AuthService {

  // Renew the token manually
  renewToken () {
    let self = this
    return new Promise((resolve, reject) => {
      mgr.signinSilent().then(function (user) {
        if (user == null) {
          self.signIn(null)
        } else{
          return resolve(user)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Get the user who is logged in
  getUser () {
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          return resolve(null)
        } else{          
          return resolve(user)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Check if there is any user logged in
  getSignedIn () {
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          return resolve(false)
        } else{
          return resolve(true)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Redirect of the current window to the authorization endpoint.
  signIn () {
    mgr.signinRedirect().catch(function (err) {
      console.log(err)
    })
  }
  
  // Redirect of the current window to the end session endpoint
  signOut () {    
    mgr.signoutRedirect().then(function (resp) {
      console.log('signed out', resp);
    }).catch(function (err) {
      console.log(err)
    })
  }

  // Get the profile of the user logged in
  getProfile () {
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          return resolve(null)
        } else{          
          return resolve(user.profile)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Get the token id
  getIdToken(){
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          return resolve(null)
        } else{          
          return resolve(user.id_token)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Get the session state
  getSessionState(){
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          return resolve(null)
        } else{          
          return resolve(user.session_state)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Get the access token of the logged in user
  getAcessToken(){
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          return resolve(null)
        } else{          
          return resolve(user.access_token)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Takes the scopes of the logged in user
  getScopes(){
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          return resolve(null)
        } else{          
          return resolve(user.scopes)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Get the user roles logged in
  getRole () {
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          return resolve(null)
        } else{          
          return resolve(user.profile.role)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }
}

export default new AuthService();