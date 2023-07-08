import { Component } from '@angular/core';
import { NgForm} from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  register(registerForm : NgForm) : void {
    // this.http.post<any>('https://reqres.in/api/posts', { title: 'Angular POST Request Example' }).subscribe(data => {
    //   this.postId = data.id;
    // })
  }
}
