// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth0: {
    clientId: 'wLSIP47wM39wKdDmOj6Zb5eSEw3JVhVp',
    domain: 'brucke.auth0.com',
    authorizationParams: {
      audience: 'http://localhost/',
      redirect_uri: 'http://localhost:4200',
    },
    errorPath: '/error',
    httpInterceptor: {
      allowedList: [
        {
          uri: 'http://localhost:3001/api/external',
        },
      ],
    },
  },
  api: {
    basePath: 'http://localhost:8000',
  },
};
