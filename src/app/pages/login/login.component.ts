import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms'
import {Login} from "../../models/login";
import {AuthService} from "../../auth/services/auth.service";
import {popupErrorMsg} from "../../ui/services/validation-error-popup.service";
import {ValidationErrorPopupService} from "../../ui/services/validation-error-popup.service";
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarModule, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  login : Login = new Login();
  popupErrorMsg: popupErrorMsg;

  constructor(private authService : AuthService, private validationErrorPopupService: ValidationErrorPopupService, private router : Router, private _snackBar: MatSnackBar) {
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
    this.authService.loginUser(this.login);
  }

  goToRegister() : void {
    this.router.navigate(['/login'])
      .then(() => {
        window.location.reload();
      });
  }

  openSnackBarError(message: string, action: string) : void {
    this._snackBar.open(message, action, {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: ['redbg']
    });
  }

  openSnackBarSuccess(message: string, action: string) : void {
    this._snackBar.open(message, action, {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: ['greenbg']
    });
  }
}
