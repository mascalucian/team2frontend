export const oidcSettings = {
    authority: "https://localhost:5001",
    client_id: "Team2Frontend",
    redirect_uri: "http://localhost:8080/callback.html",
    post_logout_redirect_uri: "http://localhost:8080/",
    response_type: "code",
    scope: "openid profile",
    automaticSilentRenew: true,
    includeIdTokenInSilentRenew: true
  }