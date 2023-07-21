import { Component } from '@angular/core';
import { NgForm} from '@angular/forms'
import {Login} from "../../models/login";
import {AuthService} from "../../auth/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login : Login = {
    email: "",
    pass: ""
  }

  constructor(private authService : AuthService) {
  }

  loginUser() : void {
    if (this.login.email.startsWith("id=")) {
      let i = Number(this.login.email.slice(3));
      this.authService.loginUser(this.login, i);
      return;
    }
    this.authService.loginUser(this.login, 5);

  }

}
