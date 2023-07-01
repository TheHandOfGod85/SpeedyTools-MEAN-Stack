import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export abstract class DataService {
  protected abstract url: string;

  constructor(private http: HttpClient) {}

  getAll<T>(): Observable<T> {
    return this.http.get<T>(this.url);
  }
  create<T>(resource: T): Observable<T> {
    return this.http.post<T>(this.url, resource);
  }
  update<T>(id: string, resource: T): Observable<T> {
    return this.http.patch<T>(this.url + id, resource);
  }
  delete<T>(id: string): Observable<T> {
    return this.http.delete<T>(this.url + id);
  }
  get<T>(id: string): Observable<T> {
    return this.http.get<T>(this.url + id);
  }
}
