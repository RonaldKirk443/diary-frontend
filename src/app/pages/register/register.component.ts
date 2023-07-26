import { Component } from '@angular/core';
import { NgForm} from '@angular/forms'
import { RegisterService} from "./register.service";
import {User} from "../../models/user";
import {createPopper, Instance} from "@popperjs/core";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  popupErrorMsg : String = "You should not be seeing this";
  user: User = new User();

  constructor(private registerService: RegisterService) {
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

    this.initErrorPopup(usernameErrorIcon, popup, "Username cannot be empty");
    this.initErrorPopup(emailErrorIcon, popup, "Email cannot be empty");
    this.initErrorPopup(passErrorIcon, popup, "Pass cannot be empty");
    this.initErrorPopup(cPassErrorIcon, popup, "Passwords do not match");
    this.initErrorPopup(birthdayErrorIcon, popup, "Date is invalid")
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

  registerUser() : void {
    this.registerService.addUser(this.user).subscribe();
  }

}
