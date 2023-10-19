import { Injectable } from '@angular/core';
import {User} from "../../models/user";
import {HttpClient} from "@angular/common/http";
import {Login} from "../../models/login";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  localId: number = 0;

  user : User = {
    id: 0
  }

  constructor(private router: Router, private http: HttpClient) {
    console.log("auth construct: " + Date.now());
  }

  loginUser(loginForm: Login, testId:number) {
    // ADD LOGIN
    let id : number = 0;
    // this.http.get<number>('/api/user/add').subscribe(data => id);
    localStorage.setItem('userId', testId.toString());
    this.router.navigate(["/"]).then(() => {window.location.reload()});
  }

  logoutUser() {
    localStorage.setItem("userId", "0");
    this.router.navigate(["/"]).then(() => {window.location.reload()});
  }

  isLoggedIn() : boolean {
    return (this.getLocalId() > 0)
  }

  getLocalId() : number {
    return Number(localStorage.getItem("userId"));
  }

  getUser() {
    if (this.isLoggedIn()) {
      return this.http.get<User>('/api/user/id/' + this.getLocalId());
    }
    return;
  }

  addUser(user: User) {
    return this.http.post<User>('/api/user/add', user);
  }

  updateUser(user: User) {
    return this.http.put<User>("/api/user/update", user);
  }

}
