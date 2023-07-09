import { Injectable } from '@angular/core'
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HTTP_INTERCEPTORS
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/auth/services/auth.service'

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        req = req.clone({
            headers: req.headers.set(
                'Authorization',
                'Bearer ' + localStorage.getItem('token')
            ),
            withCredentials: true
        })
        return next.handle(req)
    }
}

export const httpRequestInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpRequestInterceptor,
        multi: true
    }
]
