enum HiddenStatus {
  Default,
  Private,
  Public
}

export class User {
  id: number = 0;
  username?: string;
  email?: string;
  pfpLink?: string;
  birthday?: Date;
  hiddenStatus?: HiddenStatus;
}
