import { Client } from "@microsoft/microsoft-graph-client"

import { AuthServiceInterface } from "./authService"
import { Config } from "../../config"

const { scopes, version } = Config.graph

const getAuthenticatedClient = (token: string): Client =>
  Client.init({
    authProvider: done => done(null, token),
    defaultVersion: version,
  })

export interface GraphServiceInterface {
  /**
   * Returns the list of Outlook task folders
   */
  getTaskFoldersAsync(): Promise<any>
}

export class GraphService implements GraphServiceInterface {
  private auth: AuthServiceInterface

  constructor(auth: AuthServiceInterface) {
    this.auth = auth
  }

  async getTaskFoldersAsync(): Promise<any> {
    const { token } = await this.auth.getAccessTokenAsync(scopes)
    const client = getAuthenticatedClient(token)

    if (token) {
      const endpoint = `/me/outlook/taskFolders`
      const response = await client.api(endpoint).get()
      return response
    }
  }
}
