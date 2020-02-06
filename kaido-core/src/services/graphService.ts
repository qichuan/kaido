import axios, { AxiosInstance, AxiosRequestConfig } from "axios"

import { AuthServiceInterface } from "./authService"
import { Folder } from "../models/task"
import { Config } from "../../config"
import TaskList from "../../../kaido-app/src/routes/taskList"

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
    const folders = response.data.value.map(
      (folder: any) => new Folder({ id: folder.id, isDefault: folder.isDefaultFolder, name: folder.name })
    )
    return folders
  }

  async getTaskFolderListsAsync(id: string): Promise<any> {
    const endpoint = `/me/outlook/taskFolders/${id}/tasks`
    const response = await this.client.get(endpoint)
    const taskLists = response.data.value.map((list: any) => new TaskList({}))
    return taskLists
  }
}
