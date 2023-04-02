//PRODUCTION CREDENCIALS
export const environment = {
  production: true,
  BASE_PATH: 'https://project.web.app',
  API_BASE_PATH: 'https://project.web.app',
  API_AUTH_BASE_PATH: 'https://project.web.app*',
  auth: {
    domain: "https://project.web.app.auth0.com",
    clientId: "123",
    audience: "https://project.web.app",
    redirectUri: window.location.origin,
  }
};
