import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {AuthService} from "../../auth/services/auth.service";
import {Login} from "../../models/login";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {
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
    this.authService.updateUser(this.newUser).subscribe( {
      next: (result) => {
        this.oldUser = new User(result);
        this.newUser = new User(result);
        this.edit = 'none';
        this.openSnackBarSuccess("Username changed", "Ok")
      },
      error: (e) => {
        this.openSnackBarError(e.error.message, "Ok");
    }
    });

  }

  updatePassword() {
    this.authService.updatePassword(this.login).subscribe({
      next: (result) => {
        this.login = new Login();
        this.passConfirm = "";
        this.edit = 'none';
        this.openSnackBarSuccess("Password changed", "Ok")
      },
      error: (e) => {
        this.openSnackBarError(e.error.message, "Ok");
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

  openSnackBarError(message: string, action: string) : void {
    this.snackBar.open(message, action, {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: ['redbg']
    });
  }

  openSnackBarSuccess(message: string, action: string) : void {
    this.snackBar.open(message, action, {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: ['greenbg']
    });
  }
}
