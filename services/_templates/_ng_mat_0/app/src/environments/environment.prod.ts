export const environment = {
  _API_BASE_PATH: 'http://api.app.com/',
  _API_BASE_PATH_AUTH: 'http://api.app.com/*',
  auth: {
    domain: "app.eu.auth0.com",
    clientId: "123",
    audience: "https://api.app.com/",
    redirectUri: window.location.origin,
  },
};
