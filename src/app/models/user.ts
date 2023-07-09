enum HiddenStatus {
  Default,
  Private,
  Public
}

export interface User {
  id? : number,
  username : string,
  email : string,
  pfpLink? : string,
  birthday : Date,
  hiddenStatus? : HiddenStatus
}
