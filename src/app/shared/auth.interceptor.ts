import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, retry, switchMap, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthenticationService } from "../admin/shared/services/authentication.service";
import { TokenRequest, UserLoginRequestDto } from "./components/interfaces";

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
            request = this.addToken(request);
        }

        return next.handle(request)
        .pipe(
            tap(() => {}),
            catchError((err: HttpErrorResponse) => {
            if ([401, 403].includes(err.status)) {
                this.router.navigate(['/admin', 'login'])
            }
            return throwError(() => err);
            })
        )
    }

    addToken(request: HttpRequest<any>)
    {
        return request = request.clone({
            setHeaders: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        });
    }

}