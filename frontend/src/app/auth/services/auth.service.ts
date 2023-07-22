import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AuthResponse } from '../models/auth-response.model'
import { JwtHelperService } from '@auth0/angular-jwt'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { User } from '../models/user.model'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authUrl = 'http://localhost:3000/api/users/'
    private readonly TOKEN_NAME = 'token'
    private readonly USER = 'user'

    private tokenSubject: BehaviorSubject<string | null>
    token$: Observable<string | null>

    private userSubject: BehaviorSubject<any>
    user$: Observable<User>

    constructor(
        private http: HttpClient,
        private jwtHelper: JwtHelperService,
        private router: Router
    ) {
        this.tokenSubject = new BehaviorSubject<string | null>(
            localStorage.getItem(this.TOKEN_NAME)
        )
        this.token$ = this.tokenSubject.asObservable()

        this.userSubject = new BehaviorSubject<User>(
            this.getUserFromLocalStorage()
        )
        this.user$ = this.userSubject.asObservable()
    }

    login(email: string, password: string): Observable<void> {
        return this.http
            .post<AuthResponse>(this.authUrl + 'login', {
                email,
                password
            })
            .pipe(
                map((response: AuthResponse) => {
                    if (response.status === 'success') {
                        localStorage.setItem(this.TOKEN_NAME, response.token)
                        this.tokenSubject.next(response.token)
                        localStorage.setItem(
                            this.USER,
                            JSON.stringify(response.data.user)
                        )
                        this.userSubject.next(response.data.user)
                    }
                })
            )
    }

    register(
        name: string,
        email: string,
        password: string,
        passwordConfirm: string
    ) {
        return this.http
            .post<AuthResponse>(this.authUrl + 'signup', {
                email,
                password,
                passwordConfirm,
                name
            })
            .pipe(
                map((response: AuthResponse) => {
                    if (response.status === 'success') {
                        localStorage.setItem(this.TOKEN_NAME, response.token)
                        this.tokenSubject.next(response.token)
                        localStorage.setItem(
                            this.USER,
                            JSON.stringify(response.data.user)
                        )
                    }
                })
            )
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_NAME)
        this.tokenSubject.next(null)
        localStorage.removeItem(this.USER)
        this.userSubject.next({})
        this.router.navigateByUrl('/')
    }

    isLoggedIn(): boolean {
        const token = this.tokenSubject.value
        this.token$.pipe(map((token) => !!token))
        if (token) {
            return !this.jwtHelper.isTokenExpired(token)
        }
        return false
    }

    forgotPassword(email: string) {
        return this.http.post(this.authUrl + 'forgotPassword', { email })
    }

    private getUserFromLocalStorage(): any {
        const user = localStorage.getItem(this.USER)
        if (user) {
            return JSON.parse(user)
        }
        return {}
    }
}
