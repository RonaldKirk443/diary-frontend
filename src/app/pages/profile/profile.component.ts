import {Component, OnInit} from '@angular/core';
import {ProfileService} from "./profile.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user: User = {
    username:'',
    email:'',
    birthday: new Date()
  }
  constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    let user = this.profileService.getUser(3).subscribe(res => {
      console.log(res);
      this.user = res;
    });
    console.log(user);
  }


}
