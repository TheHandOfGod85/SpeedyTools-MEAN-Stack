import { Injectable } from '@angular/core'
import {
    HttpInterceptor,
    HttpErrorResponse,
    HttpRequest,
    HttpHandler,
    HTTP_INTERCEPTORS
} from '@angular/common/http'
import { Router } from '@angular/router'
import { throwError, timer } from 'rxjs'
import { catchError, retry } from 'rxjs/operators'
import { NotificationService } from '../services/notification.service'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private notifier: NotificationService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error: unknown) => {
                if (error instanceof HttpErrorResponse) {
                    if (error instanceof ErrorEvent) {
                        console.warn('Error event', error)
                    } else {
                        console.warn(
                            `error status : ${error.status}  ${error.statusText}`
                        )
                        switch (error.status) {
                            // case 401:
                            //     this.router.navigateByUrl('/')
                            //     this.notifier.showError(error.error.message)
                            //     break
                            // case 403:
                            //     this.router.navigateByUrl('/')
                            //     this.notifier.showError(error.error.message)
                            //     break
                            case 0:
                                retry({
                                    count: 3,
                                    delay: (_, retryCount) =>
                                        timer(retryCount * 1000)
                                })
                                this.router.navigateByUrl('/')
                                this.notifier.showError('Server is down')
                        }
                    }
                } else {
                    console.warn(error)
                    this.notifier.showError(
                        'Error was detected! We are already working on it!'
                    )
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
