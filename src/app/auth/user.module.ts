export class User {
  constructor(
    public email?: string,
    public name?: string,
    public userId?: string,
    public id?: string, // moongoose Id
    private _token?: string,
    private _tokenExpirationDate?: Date
  ) { }

  get token () {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }

}
