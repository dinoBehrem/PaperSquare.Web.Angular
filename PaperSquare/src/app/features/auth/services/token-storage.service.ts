import { Injectable } from '@angular/core';
import { accessToken, refreshToken } from 'src/app/core/constants/storage.constant';
import { AuthResponse } from '../components/models/authResponse.model';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {

  constructor() { }

  logOut(): void{
    this.clean();
  }

  public saveToken(tokenResource: AuthResponse): void {
    window.localStorage.removeItem(accessToken);
    window.localStorage.setItem(accessToken, tokenResource.accessToken.token);
    
    window.localStorage.removeItem(accessToken + '-expiriation');
    window.localStorage.setItem(accessToken + '-expiriation', tokenResource.accessToken.expiriation.toString());

    window.localStorage.removeItem(refreshToken);
    window.localStorage.setItem(refreshToken, tokenResource.refreshToken.token);
  }
  
  public getToken(): string | null {
    return window.localStorage.getItem(accessToken);
  }
  
  public getRefreshToken(): string | null {
    return window.localStorage.getItem(refreshToken);
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (token === '') {
      this.logOut();
      return false;
    }

    const expiriation = this.getExpiriation();
    const expiriationToDate = new Date(expiriation as string);

    if (expiriationToDate < new Date() || expiriation == null) {
      this.logOut();
      return false;
    }
    return true;
  }

  getExpiriation() {
    const expiriation: string = accessToken + '-expiriation';
    return localStorage.getItem(expiriation);
  }

  clean(): void {
    window.localStorage.removeItem(accessToken);
    window.localStorage.removeItem(accessToken + '-expiriation');
  }
}
