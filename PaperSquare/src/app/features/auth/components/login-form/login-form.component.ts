import { Component } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  header: string = 'Welcome back';
  paragraph: string = 'Sing in! Explore the world of books!';
  path : string = "../../../../../assets/images/Logo.png"

}
