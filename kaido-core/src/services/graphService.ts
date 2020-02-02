import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import { AuthServiceInterface } from "./authService"
import { Config } from "../../config"

const { url, scopes, version } = Config.graph
const baseUrl = `${url}/${version}`

export interface GraphServiceInterface {
  /**
   * Returns the list of Outlook task folders
   */
  getTaskFoldersAsync(): Promise<any>
}

export class GraphService implements GraphServiceInterface {
  private authService: AuthServiceInterface

  private client: AxiosInstance

  constructor(authService: AuthServiceInterface) {
    this.authService = authService
    this.client = axios.create({ baseURL: baseUrl })
    this.client.interceptors.request.use(
      async (config): Promise<AxiosRequestConfig> => {
        if (!this.authService) throw new Error(`Missing authService initialization in API client`)
        try {
          const accessToken = await this.authService.getAccessTokenAsync(scopes)
          config.headers.common.Authorization = `Bearer ${accessToken.token}`
        } catch (authError) {
          if ([`consent_required`, `interaction_required`, `login_required`].indexOf(authError.errorCode) !== -1) {
            this.authService.acquireConcent(scopes)
            return config
          }
          throw authError
        }
        return config
      }
    )
  }

  async getTaskFoldersAsync(): Promise<any> {
    const endpoint = `/me/outlook/taskFolders`
    const response = await this.client.get(endpoint)
    return response.data
  }
}
