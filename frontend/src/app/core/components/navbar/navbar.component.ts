import { Observable, map } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/auth/services/auth.service'
import { User } from 'src/app/auth/models/user.model'

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    isLoggedIn$: Observable<boolean>
    user$: Observable<User>
    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.isLoggedIn$ = this.authService.token$.pipe(map((token) => !!token))
        this.user$ = this.authService.user$
    }

    onLogout() {
        this.authService.logout()
    }
}
