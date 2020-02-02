import { Configuration, UserAgentApplication } from "msal"

import User from "../models/user"
import { Config } from "../../config"
import AuthError from "../utils/authError"

const authConfig: Configuration = {
  auth: {
    clientId: Config.auth.clientId,
    redirectUri: Config.auth.redirectUri,
    authority: Config.auth.authority,
  },
  // system: {
  //     logger: new Logger((lvl: any, message: any, piEnabled?: boolean ): void => { console.log('Auth: ', message);})
  // }
}

const defaultLoginScopes = Config.auth.defaultScopes

export interface AuthServiceInterface {
  /**
   * Get the users concent to external application
   */
  acquireConcent(resource: string[]): void

  /**
   * Redirects the user to authority for authentication
   */
  login(): void

  /**
   * Clears localstorage and redirects user to authority for signout
   */
  logout(): void

  /**
   * Handle response from authority when user is done authenticating
   */
  handleRedirectCallback(): void

  /**
   * Returns the currently logged in users access token for a given resource
   */
  getAccessTokenAsync(resource: string[]): Promise<AccessToken>

  /**
   * Returns information on the currently logged in user, or null if not logged in
   */
  getCurrentUser(): User | null
}

type AccessToken = {
  token: string
  expiresAt: Date
}

export class AuthService implements AuthServiceInterface {
  private authInstance: UserAgentApplication

  constructor() {
    this.authInstance = new UserAgentApplication(authConfig)
  }

  login(): void {
    this.authInstance.loginRedirect({ scopes: defaultLoginScopes })
  }

  acquireConcent(resource: string[]): void {
    this.authInstance.loginRedirect({ scopes: resource })
  }

  logout(): void {
    this.authInstance.logout()
  }

  handleRedirectCallback(): void {
    try {
      this.authInstance.handleRedirectCallback((err /* response */) => {
        if (err) throw new AuthError(err.message)
      })
    } catch (err) {
      console.error(`Failed to handle Redirect Callback`)
      throw err
    }
  }

  async getAccessTokenAsync(resource: string[]): Promise<AccessToken> {
    const response = await this.authInstance.acquireTokenSilent({
      scopes: resource,
      // redirectUri: `${window.location.origin}/assets/auth.html`,
    })
    return { token: response.accessToken, expiresAt: response.expiresOn }
  }

  getCurrentUser(): User | null {
    const account = this.authInstance.getAccount()
    if (!account) return null
    return new User({ username: account.userName, fullname: account.name, id: account.accountIdentifier })
  }
}
