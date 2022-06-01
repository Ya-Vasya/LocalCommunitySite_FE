import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { TokenRequest, User, UserDto, UserEditDto, UserLoginRequestDto } from "src/app/shared/components/interfaces";
import { Observable, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthenticationService {

    public error$: Subject<string> = new Subject<string>();

    constructor(private httpClient: HttpClient) {}

    baseUrl = environment.baseUrl

    private readonly API_ROUTES = {
        default: `/Authentication`,
        login: `/Authentication/login`,
        refresh: '/Authentication/refresh-token',
        register: `/Authentication/register`,
        // example with params. To use just call getUser(userId)
        // getUser: (userId: string) => `/user/${userId}`
      }

    get token(): string | null {
        return localStorage.getItem('jwtToken')
    }

    get refreshToken(): string | null {
        return localStorage.getItem('refreshToken')
    }

    login(user: User) : Observable<UserLoginRequestDto> {
        const url: string = `${this.baseUrl}${this.API_ROUTES.login}`
        return this.httpClient.post<UserLoginRequestDto>(url, user)
        .pipe(
            tap((data : UserLoginRequestDto) => this.setToken(data)),
            catchError(err => this.handleError(err))
        )
    }

    register(user: User) : Observable<UserLoginRequestDto> {
        const url: string = `${this.baseUrl}${this.API_ROUTES.register}`
        return this.httpClient.post<UserLoginRequestDto>(url, user)
        .pipe(
            tap(),
            catchError(err => this.handleError(err))
        )
    }

    refresh(tokenRequest: TokenRequest)
    {
        const url: string = `${this.baseUrl}${this.API_ROUTES.refresh}`

        let response: UserLoginRequestDto;

        return this.httpClient.post<UserLoginRequestDto>(url, tokenRequest)
        .pipe(catchError(err => throwError(() => err)))
        .subscribe((data : UserLoginRequestDto) => { 
                response = data,
                this.setToken(response)
            })
    }

    private handleError(error: HttpErrorResponse)
    {
        if (error.error.status === 0) {
            console.error('An error occurred:', error.error);
          } else {
            console.log(error.error);
            this.error$.next(error.error.Message)
          }

          return throwError(() => error.error);
    }

    create(user: User): Observable<User> {
        const url: string = `${this.baseUrl}${this.API_ROUTES.register}`
        return this.httpClient.post<User>(url, user);
    }

    getAll(): Observable<Array<UserDto>> {
        const url: string = `${this.baseUrl}${this.API_ROUTES.default}`
        return this.httpClient.get<Array<UserDto>>(url);
    }

    remove(email: string) {
        const url: string = `${this.baseUrl}${this.API_ROUTES.default}/${email}`
        return this.httpClient.delete<void>(url);
    }

    getById(email: string) : Observable<UserDto>
    {
        const url: string = `${this.baseUrl}${this.API_ROUTES.default}/${email}`
        return this.httpClient.get<UserDto>(url);
    }

    update(user: UserEditDto) {
        const url: string = `${this.baseUrl}${this.API_ROUTES.default}`
        return this.httpClient.put<UserEditDto>(url, user);
    }

    logout() {
        this.setToken(null)
    }

    isAuthenticated(): boolean {
        return !!this.token
    }



    private setToken(response: UserLoginRequestDto | null) {
        console.log(response)
        if (response)
        {
            localStorage.setItem('jwtToken', response.token)
            localStorage.setItem('refreshToken', response.refreshToken)
        } else {
            localStorage.clear()
        }
    }
}