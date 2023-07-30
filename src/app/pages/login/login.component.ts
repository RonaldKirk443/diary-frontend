import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms'
import {Login} from "../../models/login";
import {AuthService} from "../../auth/services/auth.service";
import {popupErrorMsg} from "../../ui/services/validation-error-popup.service";
import {ValidationErrorPopupService} from "../../ui/services/validation-error-popup.service";

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
  popupErrorMsg: popupErrorMsg;

  constructor(private authService : AuthService, private validationErrorPopupService: ValidationErrorPopupService) {
    this.popupErrorMsg = validationErrorPopupService.popupErrorMsg;
  }

  ngOnInit() {
    const emailErrorIcon = document.querySelector<HTMLElement>('#emailErrorIcon');
    const passErrorIcon = document.querySelector<HTMLElement>('#passErrorIcon');
    const popup = document.querySelector<HTMLElement>('#errorPopup');
    if (!emailErrorIcon || !passErrorIcon || !popup) return;
    this.validationErrorPopupService.initErrorPopup(emailErrorIcon, popup, "Email cannot be empty");
    this.validationErrorPopupService.initErrorPopup(passErrorIcon, popup, "Pass cannot be empty");
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
