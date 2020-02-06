const redirectAppEndpoint = `https://login.microsoftonline.com/common/oauth2/nativeclient`
// const redirectAppEndpoint = `http://localhost:8081`
const redirectUri: string = process.env.NODE_ENV === `production` ? redirectAppEndpoint : window.location.origin

export const Config = {
  auth: {
    clientId: `e3427d2d-4873-4852-b627-d1721497ddea`,
    authority: ``,
    defaultScopes: [`user.read`, `calendars.read`, `tasks.readwrite`],
    redirectUri,
  },
  cache: {
    cacheLocation: `localStorage`,
    storeAuthStateInCookie: true,
  },
  graph: {
    url: `https://graph.microsoft.com`,
    scopes: [`tasks.readwrite`],
    version: `beta`,
  },
}
