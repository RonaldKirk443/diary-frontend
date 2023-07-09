import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http : HttpClient) { }

  addUser(user: User) {
    console.log("HEUKSDHKJUSGD")
    return this.http.post<User>('/api/user/add', user);
  }

}
