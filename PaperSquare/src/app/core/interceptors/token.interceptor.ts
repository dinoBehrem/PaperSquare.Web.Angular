import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, switchMap, throwError } from "rxjs";
import { AuthService } from "src/app/features/auth/services/auth.service";
import { TokenStorageService } from "src/app/features/auth/services/token-storage.service";
import { accessToken } from "../constants/storage.constant";
import { EventData } from "../models/event.model";
import { EventbusService } from "../services/eventbus.service";

@Injectable()
export class AuthInterceprot implements HttpInterceptor{
    private _isRefreshing: boolean = false;

    constructor(private _tokenStorageService: TokenStorageService, private _authService: AuthService, private _eventBusService: EventbusService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {        
        req = this.addTokenToRequsetHeaders(req);        
        return next.handle(req).pipe(
            catchError((err) => {
                if (err instanceof HttpErrorResponse && err.status === 401) {
                    return this.handle401Error(req, next);
                }
                return throwError(() => err);                 
            })
        );
    }

    private handle401Error(req: HttpRequest<any>, next: HttpHandler): any {       
        if (!this._isRefreshing) {
            this._isRefreshing = true;
                return this._authService.refreshToken(this._tokenStorageService.getRefreshToken()).pipe(
                    switchMap((res : any) => {
                        this._tokenStorageService.saveToken(res);
                        this._isRefreshing = false;
                        req = this.addTokenToRequsetHeaders(req);
                        return next.handle(req);
                    })
                );            
        }
        
        req = this.addTokenToRequsetHeaders(req);
        return next.handle(req);
    }

    private addTokenToRequsetHeaders(req: HttpRequest<any>){
        const token = this._tokenStorageService.getAccessToken();
        if (token) {
            req = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
        }

        return req;
    }
}

export const authInterceprotProvider = [ 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceprot, multi: true}
];