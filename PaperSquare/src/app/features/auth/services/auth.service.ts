import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { LoginInsert } from '../components/models/loginInsert.model';
import { auth } from '../../../core/constants/paths.constant';
import { Observable } from 'rxjs'

const _httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private _httpClient: HttpClient) { }

  login(loginInsert: LoginInsert): Observable<any>{
    return this._httpClient.post( auth + '/login', loginInsert, _httpOptions);
  }

  refreshToken(refreshToken: string | null) {
    return this._httpClient.post(auth + '/refresh-token', {token: refreshToken}, _httpOptions);
  }
  
  refreshTokenTest() {
    return this._httpClient.get(auth + '/refresh-token-test', _httpOptions);
  }
}
