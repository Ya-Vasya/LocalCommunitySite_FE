import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, retry, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthenticationService } from "../admin/shared/services/authentication.service";
import { TokenRequest } from "./components/interfaces";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private auth: AuthenticationService,
        private router: Router
    )
    {
    }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if(this.auth.isAuthenticated() && request.url.startsWith(environment.baseUrl))
        {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
            });
        }

        return next.handle(request)
        .pipe(
            tap(() => { console.log('Intercept')}),
            catchError((err: HttpErrorResponse) => {
            if ([401, 403].includes(err.status)) {
                const tokenRequest: TokenRequest = {
                    token: localStorage.getItem('jwtToken'),
                    refreshToken: localStorage.getItem('refreshToken')
                }
                try {
                    debugger;
                    this.auth.refresh(tokenRequest)
                } catch (error) {
                    this.router.navigate(['/admin', 'login'])
                }
            }
            return throwError(() => err);
            })
        )
    }

}