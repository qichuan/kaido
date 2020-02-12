/**
 * https://docs.microsoft.com/en-us/graph/api/outlooktask-get?view=graph-rest-beta&tabs=http#response-1
 */
type TaskDateTime = {
  dateTime: Date
  timezone: string
}

export interface TaskInterface {
  id: string
  createdDateTime: Date
  lastModifiedDateTime: Date
  completedDateTime: Date | null
  dueDateTime: TaskDateTime
  importance: `low` | `normal` | `high`
  owner: string
  parentFolderId: string
  recurrence: boolean | null
  reminderDateTime: Date | null
  sensitivity: `normal` | `personal` | `private` | `confidential`
  startDateTime: TaskDateTime
  status: `notStarted` | `inProgress` | `completed` | `waitingOnOthers` | `deferred`
  subject: string
}

export default class Task implements Partial<TaskInterface> {
  constructor(json: TaskInterface) {
    this._id = json.id
    // this._createdDateTime = json.createdDateTime
    // this._lastModifiedDateTime = json.lastModifiedDateTime
    this._completedDateTime = json.completedDateTime
    // this._dueDateTime = json.dueDateTime
    this._importance = json.importance
    // this._owner = json.owner
    // this._parentFolderId = json.parentFolderId
    // this._recurrence = json.recurrence
    this._reminderDateTime = json.reminderDateTime
    // this._sensitivity = json.sensitivity
    // this._startDateTime = json.startDateTime
    this._status = json.status
    this._subject = json.subject
  }

  private _id: string

  // private _createdDateTime: Date

  // private _lastModifiedDateTime: Date

  private _completedDateTime: Date | null

  // private _dueDateTime: TaskDateTime

  private _importance: string

  // private _owner: string

  // private _parentFolderId: string

  // private _recurrence: boolean | null

  private _reminderDateTime: Date | null

  // private _sensitivity: string

  // private _startDateTime: TaskDateTime

  private _status: string

  private _subject: string

  get id(): string {
    return this._id
  }

  // get createdDateTime(): Date {
  //   return this._createdDateTime
  // }

  // get lastModifiedDateTime(): Date {
  //   return this._lastModifiedDateTime
  // }

  get completedDateTime(): Date | null {
    return this._completedDateTime
  }

  // get dueDateTime(): TaskDateTime {
  //   return this._dueDateTime
  // }

  get importance(): string {
    return this._importance
  }

  // get owner(): string {
  //   return this._owner
  // }

  // get parentFolderId(): string {
  //   return this._parentFolderId
  // }

  // get recurrence(): boolean | null {
  //   return this._recurrence
  // }

  get reminderDateTime(): Date | null {
    return this._reminderDateTime
  }

  // get sensitivity(): string {
  //   return this._sensitivity
  // }

  // get startDateTime(): TaskDateTime {
  //   return this._startDateTime
  // }

  get status(): string {
    return this._status
  }

  get subject(): string {
    return this._subject
  }
}
