import { Injectable } from '@angular/core'
import {
    HttpInterceptor,
    HttpErrorResponse,
    HttpRequest,
    HttpHandler,
    HTTP_INTERCEPTORS
} from '@angular/common/http'
import { Router } from '@angular/router'
import { throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { NotificationService } from '../services/notification.service'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private notifier: NotificationService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.router.navigateByUrl('/')
                    this.notifier.showError(error.error.message)
                    console.log(error.error.message)
                }

                return throwError(() => error)
            })
        )
    }
}

export const HttpErrorHandlerProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}
