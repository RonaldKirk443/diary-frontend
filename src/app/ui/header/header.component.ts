import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  loggedIn : boolean = true;

  constructor(private authService : AuthService) {
    console.log("Header constructor")
    this.loggedIn = authService.isLoggedIn();
  }

  ngOnInit(): void {
    console.log("Header onInit")
  }


}
