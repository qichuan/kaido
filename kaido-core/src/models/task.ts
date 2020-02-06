/**
 * https://docs.microsoft.com/en-us/graph/api/resources/outlooktaskfolder?view=graph-rest-beta#properties
 */
export interface FolderInterface {
  id: string
  isDefault: boolean
  name: string
}

export class Folder implements FolderInterface {
  constructor(folder: FolderInterface) {
    this._id = folder.id
    this._isDefault = folder.isDefault
    this._name = folder.name
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
