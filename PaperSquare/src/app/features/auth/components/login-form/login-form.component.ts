import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { LoginInsert } from '../models/loginInsert.model'; 

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  _header: string = 'Welcome back';
  _paragraph: string = 'Sing in! Explore the world of books!';
  _path : string = "../../../../../assets/images/Logo.png"

  _loginDetails: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  _errorMessage!: string;
  _isLoggedIn: boolean = false;
  _isLoginFailed: boolean = false;

  constructor(private _authService: AuthService, private _tokenStorageService: TokenStorageService){}

  ngOnInit(): void {
    if(this._tokenStorageService.getToken()){
      this._isLoggedIn = true;
    }
  }

  signIn(): void{
    this._authService.login(this._loginDetails.value as LoginInsert).subscribe({
      next: (res: any) => {
        this._tokenStorageService.saveToken(res);
        this._isLoginFailed = false;
        this._isLoggedIn = true;
      },
      error: (err: any) => {
        this._errorMessage = err.error.errors[0];
      }});
  }

  refreshToken(){
    return this._authService.refreshTokenTest().subscribe((data: any) => console.log(data));
  }
}
