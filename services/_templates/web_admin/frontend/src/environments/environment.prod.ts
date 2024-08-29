export const environment = {
  production: true,
  _API_BASE_PATH: 'http://api.app.com/',
  _API_BASE_PATH_AUTH: 'http://api.app.com/*',
  auth0: {
    clientId: 'wLSIP47wM39wKdDmOj6Zb5eSEw3JVhVp',
    domain: 'brucke.auth0.com',
    authorizationParams: {
      audience: 'http://example.com/',
      redirect_uri: 'http://example.com',
    },
    errorPath: '/error',
    httpInterceptor: {
      allowedList: [
        {
          uri: 'http://localhost:8000/api/external',
        },
      ],
    },
  },
  api: {
    basePath: 'http://localhost:8000',
  },
};
