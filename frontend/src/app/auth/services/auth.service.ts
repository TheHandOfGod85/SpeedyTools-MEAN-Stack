import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AuthResponse } from '../models/auth-response.model'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authUrl = 'http://localhost:3000/api/users/'

    constructor(private http: HttpClient) {}

    login(email: string, password: string) {
        return this.http.post<AuthResponse>(this.authUrl + 'login', {
            email,
            password
        })
    }
}
