import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/user";
import {Collection} from "../../models/collection";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  updateUser(user: User) {
    return this.http.put<User>("/api/user/update", user);
  }

}
