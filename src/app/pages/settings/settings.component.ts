import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {AuthService} from "../../auth/services/auth.service";
import {Login} from "../../models/login";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  oldUser: User = new User();
  newUser: User = new User();
  login: Login = new Login();

  edit : string = 'none';
  hiddenOptions: string[] = ['Private', 'Public'];
  passConfirm: string = "";

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getUser()?.subscribe(result => {
      this.oldUser = new User(result);
      this.newUser = new User(result);
    });
  }

  editMode(edit: string) {
    this.newUser = new User(this.oldUser);
    this.edit = edit;
  }

  cancelEditing() {
    this.newUser = new User(this.oldUser);
    this.edit='none';
  }

  checkSame() {
    if (this.passConfirm != this.login.pass) {
      //Error
    }
  }


  updatePfp() {
    this.updateUser();
  }

  updateEmail() {
    this.updateUser();
  }

  updateUsername() {
    this.updateUser();
  }

  updatePassword() {
    this.authService.updatePassword(this.login).subscribe({
      next: (result) => {
        this.login = new Login();
        this.passConfirm = "";
        this.edit = 'none';
      },
      error: (e) => {
        //snackbar with this:
        //console.log(e.error.message)
      }
    });

  }

  updateHiddenStatus() {
    this.updateUser();
  }

  updateUser() {
    this.authService.updateUser(this.newUser).subscribe(result => {
      this.oldUser = new User(result);
      this.newUser = new User(result);
    });
    this.edit = 'none';
  }
}
