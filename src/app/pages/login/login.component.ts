import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms'
import {Login} from "../../models/login";
import {AuthService} from "../../auth/services/auth.service";
import {createPopper, Instance} from "@popperjs/core";
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
  popupErrorMsg : String = "You shouldn't be seeing this";

  constructor(private authService : AuthService) {
  }

  ngOnInit() {
    const emailErrorIcon = document.querySelector<HTMLElement>('#emailErrorIcon');
    const passErrorIcon = document.querySelector<HTMLElement>('#passErrorIcon');
    const popup = document.querySelector<HTMLElement>('#errorPopup');
    if (!emailErrorIcon || !passErrorIcon || !popup) return;
    this.initErrorPopup(emailErrorIcon, popup, "Email cannot be empty");
    this.initErrorPopup(passErrorIcon, popup, "Pass cannot be empty");
  }

  initErrorPopup(obj : HTMLElement, popup : HTMLElement, errorMsg : String) {
    let popperInstance : Instance;
    const showEvents = ['mouseenter'];
    const hideEvents = ['mouseleave'];

    popperInstance = createPopper(obj, popup, {
      placement: 'right'
    });

    showEvents.forEach((event) => {
      obj.addEventListener(event, () => {
        this.popupErrorMsg = errorMsg;
        showErrorPopup();
      });
    });
    hideEvents.forEach((event) => {
      obj.addEventListener(event, () => {
        hide();
      });
    });

    function showErrorPopup() {
      popup.setAttribute('data-show', '');

      popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 7],
            },
          },
          { name: 'eventListeners', enabled: true },
        ],
      }));

      popperInstance.update();
    }

    function hide() {
      popup.removeAttribute('data-show');

      popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
          { name: 'eventListeners', enabled: false },
        ],
      }));
    }
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
