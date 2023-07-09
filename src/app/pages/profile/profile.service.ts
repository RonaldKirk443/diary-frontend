import { Injectable } from '@angular/core';
import { User } from "../../models/user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }
  getUser(id: number){
    return this.http.get<User>('/api/user/id/' + id);
  }
}
