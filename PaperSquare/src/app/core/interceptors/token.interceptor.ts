import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenStorageService } from "src/app/features/auth/services/token-storage.service";
import { accessToken } from "../constants/storage.constant";

@Injectable()
export class AuthInterceprot implements HttpInterceptor{
    
    constructor(private _tokenStorageService: TokenStorageService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const token = this._tokenStorageService.getToken();

        if (token != null) {
            req = req.clone({
                headers: req.headers.set(accessToken, `Bearer ${token}`)
            });
        }
        return next.handle(req);
    }
}

export const authInterceprotProvider = [ 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceprot, multi: true}
];