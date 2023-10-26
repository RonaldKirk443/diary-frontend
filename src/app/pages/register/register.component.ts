import { Component } from '@angular/core';
import { NgForm} from '@angular/forms'
import {User} from "../../models/user";
import {popupErrorMsg, ValidationErrorPopupService} from "../../ui/services/validation-error-popup.service";
import {AuthService} from "../../auth/services/auth.service";
import {Login} from "../../models/login";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  popupErrorMsg: popupErrorMsg;
  user: User = new User();
  login: Login = new Login();

  constructor(private authService: AuthService, private validationErrorPopupService: ValidationErrorPopupService, private router: Router) {
    this.popupErrorMsg = validationErrorPopupService.popupErrorMsg;
  }

  ngOnInit() {
    this.user.birthday = new Date("2010-3-25");
    const usernameErrorIcon = document.querySelector<HTMLElement>('#usernameErrorIcon');
    const emailErrorIcon = document.querySelector<HTMLElement>('#emailErrorIcon');
    const passErrorIcon = document.querySelector<HTMLElement>('#passErrorIcon');
    const cPassErrorIcon = document.querySelector<HTMLElement>('#cPassErrorIcon');
    const birthdayErrorIcon = document.querySelector<HTMLElement>('#birthdayErrorIcon');
    const popup = document.querySelector<HTMLElement>('#errorPopup');

    if (!usernameErrorIcon || !emailErrorIcon || !passErrorIcon || !cPassErrorIcon || !birthdayErrorIcon || !popup) return;

    this.validationErrorPopupService.initErrorPopup(usernameErrorIcon, popup, "Username cannot be empty");
    this.validationErrorPopupService.initErrorPopup(emailErrorIcon, popup, "Email cannot be empty");
    this.validationErrorPopupService.initErrorPopup(passErrorIcon, popup, "Pass cannot be empty");
    this.validationErrorPopupService.initErrorPopup(cPassErrorIcon, popup, "Passwords do not match");
    this.validationErrorPopupService.initErrorPopup(birthdayErrorIcon, popup, "Date is invalid")
  }

  registerUser() : void {
    this.authService.addUser(this.user).subscribe(user => {
      this.login.userId = user.id;
      if(user.email) this.login.email = user.email;
      this.authService.addLogin(this.login).subscribe( () => {
        this.authService.loginUser(this.login);
      })
    });
  }

  goToLogin() : void {
    this.router.navigate(['/login'])
      .then(() => {
        window.location.reload();
      });
  }

}
