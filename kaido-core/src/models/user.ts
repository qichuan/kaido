import UserToken from "./userToken"

interface UserInterface {
  username: string
  fullname: string
  id: string
}

type ParsedUser = {
  username: string
  fullname: string
  id: string
}

export default class User implements UserInterface {
  static fromToken(token: string): User {
    const userToken = UserToken.parse(token)
    return new User({ username: userToken.username, fullname: userToken.name, id: userToken.oid })
  }

  constructor(user: ParsedUser) {
    this._id = user.id
    this._username = user.username
    this._fullname = user.fullname
  }

  private _id: string

  private _username: string

  private _fullname: string

  get id(): string {
    return this._id
  }

  get username(): string {
    return this._username
  }

  get fullname(): string {
    return this._fullname
  }
}
