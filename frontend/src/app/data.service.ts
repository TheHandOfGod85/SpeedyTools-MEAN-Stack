import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class DataService<T, V> {
    protected abstract url: string

    constructor(protected http: HttpClient) {}

    getAll(): Observable<T> {
        return this.http.get<T>(this.url)
    }
    create(resource: V): Observable<T> {
        return this.http.post<T>(this.url, resource)
    }
    update(id: string, resource: V): Observable<T> {
        return this.http.patch<T>(this.url + id, resource)
    }
    delete(id: string): Observable<T> {
        return this.http.delete<T>(this.url + id)
    }
    get(id: string): Observable<T> {
        return this.http.get<T>(this.url + id)
    }
}
