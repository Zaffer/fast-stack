// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  QRS_BASE_PATH: 'http://localhost:8100',
  QRS_API_BASE_PATH: 'http://localhost:8000',
  QRS_API_AUTH_BASE_PATH: 'http://localhost:8000/*',
  auth: {
    domain: "http://localhost:8100",
    clientId: "123",
    audience: "http://localhost:8100",
    redirectUri: window.location.origin,
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
