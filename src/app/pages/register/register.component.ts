import { Component } from '@angular/core';
import { NgForm} from '@angular/forms'
import { RegisterService} from "./register.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = {
    id: 0,
    username: '',
    email: '',
    birthday: new Date("2010-3-25")
  };

  constructor(private registerService: RegisterService) {
  }
  registerUser() : void {
    this.registerService.addUser(this.user).subscribe();
  }

}
