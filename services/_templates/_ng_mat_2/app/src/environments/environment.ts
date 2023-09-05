export const environment = {
  production: false,
  // nm2_V1_PATH: 'http://localhost:5000',
  // nm2_BASE_PATH: 'http://localhost:4200',
  // nm2_API_BASE_PATH: 'http://localhost:8000',
  // nm2_API_AUTH_BASE_PATH: 'http://localhost:8000/*',
  auth: {
    domain: "nm2.eu.auth0.com",
    clientId: "nm2_id",
    authorizationParams: {
      redirect_uri: window.location.origin
    },
  },
};