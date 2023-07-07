import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CollectionsComponent } from './collections/collections.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    HomeComponent,
    CollectionsComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
