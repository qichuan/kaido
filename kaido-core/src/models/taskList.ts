/**
 *    {
      "id": "AAMkADA1MTrfAAA=",
      "createdDateTime": "2016-04-22T05:44:01.2012012Z",
      "lastModifiedDateTime": "2016-04-22T05:44:02.9980882Z",
      "changeKey": "1/KC9Vmu40G3DwB6Lgs7MAAAIOJMxw==",
      "categories": [ ],
      "assignedTo": null,
      "body": {
        "contentType": "text",
        "content": ""
      },
      "completedDateTime": null,
      "dueDateTime": {
        "dateTime": "2016-04-25T07:00:00.0000000",
        "timeZone": "UTC"
      },
      "hasAttachments":false,
      "importance": "normal",
      "isReminderOn": false,
      "owner": "Administrator",
      "parentFolderId": "AQMkADA1MTBEgAAAA==",
      "recurrence": null,
      "reminderDateTime": null,
      "sensitivity": "normal",
      "startDateTime": {
        "dateTime": "2016-04-23T07:00:00.0000000",
        "timeZone": "UTC"
      },
      "status": "notStarted",
      "subject": "Shop for dinner"
    },
 */
export interface TaskListInterface {
  id: string
  createdDateTime: Date
  lastModifiedDateTime: Date
  completedDateTime: Date | null
  dueDateTime: {
    dateTime: Date
    timezone: string
  }
  importance: string
  owner: string
  parentFolderId: string
  recurrence: boolean | null
  reminderDateTime: Date | null
  sensitivity: string
  startDateTime: {
    dateTime: Date
    timezone: string
  }
  status: string
  subject: string
}

export class TaskList implements TaskListInterface {
  constructor(json: TaskListInterface) {
    this._id = json.id
    this._isDefault = json.isDefault
    this._name = json.name
  }
}
