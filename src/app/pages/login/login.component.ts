import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms'
import {Login} from "../../models/login";
import {AuthService} from "../../auth/services/auth.service";
import {popupErrorMsg} from "../../ui/services/validation-error-popup.service";
import {ValidationErrorPopupService} from "../../ui/services/validation-error-popup.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login : Login = new Login();
  popupErrorMsg: popupErrorMsg;

  constructor(private authService : AuthService, private validationErrorPopupService: ValidationErrorPopupService, private router : Router) {
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
    this.authService.authLogin(this.login).subscribe({
      next: (userId: number) => {
        this.authService.loginUser(userId);
      },
      error: (e) => {
        if (e.error == -1) {
          //EMAIL
        }
        else if (e.error == -2) {
          //PASS
        }
        else {
          //unhandled exception
        }
      }
    });
  }

  goToRegister() : void {
    this.router.navigate(['/login'])
      .then(() => {
        window.location.reload();
      });
  }

}
