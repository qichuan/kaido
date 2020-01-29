export const config = {
  auth: {
    clientId: `e3427d2d-4873-4852-b627-d1721497ddea`,
    authority: ``,
    defaultScopes: [`user.read`, `calendars.read`],
    redirectUri: `https://login.microsoftonline.com/common/oauth2/nativeclient`,
    // redirectUri: window.location.origin,
  },
  externalResources: {
    graphApi: {
      url: ``,
      scope: [],
      version: ``,
    },
  },
}
