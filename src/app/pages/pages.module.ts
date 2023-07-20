import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CollectionsComponent } from './collections/collections.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from "../app-routing.module";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    HomeComponent,
    CollectionsComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent
  ],
    imports: [
        CommonModule,
        AppRoutingModule,
        FormsModule
    ]
})
export class PagesModule { }
