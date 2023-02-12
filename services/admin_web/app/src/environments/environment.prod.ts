export const environment = {
  BACKEND_BASE_PATH: 'http://api.app.com',
  BACKEND_BASE_PATH_AUTH: 'http://api.app.com/*',
  auth: {
    domain: "app.eu.auth0.com",
    clientId: "123",
    audience: "https://api.app.com/",
    redirectUri: window.location.origin,
  },
};
