import {HiddenStatus} from "../enums/hiddenStatus";


export class User {
  id: number = 0;
  username?: string;
  email?: string;
  pfpLink?: string;
  birthday?: Date;
  hiddenStatus?: HiddenStatus;
}
