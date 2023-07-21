import {User} from "./user";
import {HiddenStatus} from "../enums/hiddenStatus";

export class Collection {
  id: number = 0;
  user?: User;
  title?: string;
  description?: string;
  backgroundImgLink?: string;
  hiddenStatus?: HiddenStatus;
}
