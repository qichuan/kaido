import axios, { AxiosInstance, AxiosRequestConfig } from "axios"

import { AuthServiceInterface } from "./authService"
import Folder from "../models/folder"
import Task from "../models/task"
import { Config } from "../../config"

const { url, scopes, version } = Config.graph
const baseUrl = `${url}/${version}`

export interface GraphServiceInterface {
  /**
   * Returns the list of Outlook task folders
   */
  getTaskFoldersAsync(): Promise<any>
  createTaskFolderAsync(name: string): Promise<any>
  deleteTaskFolderAsync(folderId: string): Promise<any>

  getTaskFolderListsAsync(folderId: string): Promise<any>
  getTaskAsync(taskId: string): Promise<any>

  createTaskAsync(folderId: string, data: any): Promise<any>
  completeTaskAsync(taskId: string): Promise<any>
  deleteTaskAsync(taskId: string): Promise<any>
  updateTaskAsync(taskId: string, data: any): Promise<any>
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
          // console.log(accessToken.token)
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
      (json: any) => new Folder({ id: json.id, isDefault: json.isDefaultFolder, name: json.name })
    )
    return folders
  }

  async createTaskFolderAsync(name: string): Promise<any> {
    const endpoint = `/me/outlook/taskFolders`
    try {
      const response = await this.client.post(endpoint, { name })
      const json = response.data
      return new Folder({ id: json.id, isDefault: json.isDefaultFolder, name: json.name })
    } catch (error) {
      throw new Error(`Failed to create new task folder.`)
    }
  }

  async deleteTaskFolderAsync(folderId: string): Promise<any> {
    const endpoint = `/me/outlook/taskFolders/${folderId}`
    try {
      const response = await this.client.delete(endpoint)
      const json = response.data
      return json
    } catch (error) {
      throw new Error(`Failed to delete task folder.`)
    }
  }

  async getTaskFolderListsAsync(folderId: string): Promise<any> {
    const endpoint = `/me/outlook/taskFolders/${folderId}/tasks`
    const response = await this.client.get(endpoint)
    const taskLists = response.data.value.map(
      (json: any) =>
        new Task({
          id: json.id,
          completedDateTime: json.completedDateTime,
          importance: json.importance,
          reminderDateTime: json.reminderDateTime,
          status: json.status,
          subject: json.subject,
        })
    )
    return taskLists
  }

  async getTaskAsync(taskId: string): Promise<any> {
    const endpoint = `/me/outlook/tasks/${taskId}`
    try {
      const response = await this.client.get(endpoint)
      const json = response.data
      return json
    } catch (error) {
      throw new Error(`Failed to get the task. ID: ${taskId}`)
    }
  }

  async createTaskAsync(folderId: string, subject: string): Promise<any> {
    const endpoint = `/me/outlook/taskFolders/${folderId}/tasks`
    try {
      const response = await this.client.post(endpoint, { subject })
      const task = response.data
      return task
    } catch (error) {
      throw new Error(`Failed to create a task.`)
    }
  }

  async completeTaskAsync(taskId: string): Promise<any> {
    const endpoint = `/me/outlook/tasks/${taskId}/complete`
    try {
      const response = await this.client.post(endpoint)
      return response.data.value
    } catch (error) {
      throw new Error(`Failed to complete a task.`)
    }
  }

  async deleteTaskAsync(taskId: string): Promise<any> {
    const endpoint = `/me/outlook/tasks/${taskId}`
    try {
      const response = await this.client.delete(endpoint)
      return response.data.value
    } catch (error) {
      throw new Error(`Failed to delete a task.`)
    }
  }

  async updateTaskAsync(taskId: string, data: any): Promise<any> {
    const endpoint = `/me/outlook/tasks/${taskId}`
    try {
      if (data) {
        const response = await this.client.patch(endpoint, data)
        return response.data
      }
    } catch (error) {
      throw new Error(`Failed to update a task.`)
    }
  }
}
