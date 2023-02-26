// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  _API_AUTH_BASE_PATH: 'http://localhost:8000/*',
  auth: {
    domain: "app.eu.auth0.com",
    clientId: "123",
    audience: "https://api.app.com/",
    redirectUri: window.location.origin,
  },
};
