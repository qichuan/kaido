/**
 * https://docs.microsoft.com/en-us/graph/api/resources/outlooktaskfolder?view=graph-rest-beta#properties
 */
export interface FolderInterface {
  id: string
  isDefault: boolean
  name: string
}

export class Folder implements FolderInterface {
  constructor(json: FolderInterface) {
    this._id = json.id
    this._isDefault = json.isDefault
    this._name = json.name
  }

  private _id: string

  private _isDefault: boolean

  private _name: string

  get id(): string {
    return this._id
  }

  get isDefault(): boolean {
    return this._isDefault
  }

  get name(): string {
    return this._name
  }
}
