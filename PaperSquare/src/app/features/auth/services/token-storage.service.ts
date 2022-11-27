import { Injectable } from '@angular/core';
import { TokenResource } from '../components/models/tokenResource.model';
import { accessToken } from 'src/app/core/constants/storage.constant';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {

  constructor() { }

  logOut(): void{
    window.sessionStorage.clear();
  }

  public saveToken(tokenResource: TokenResource): void {
    window.sessionStorage.removeItem(accessToken);
    window.sessionStorage.setItem(accessToken, tokenResource.token);
  }
  
  public getToken(): string | null {
    return window.sessionStorage.getItem(accessToken);
  }
}
