import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private cache = new Map<string, any>();

  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<any> {
    const cacheKey = `users-page-${page}`;
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }
    return this.http.get<any>(`https://reqres.in/api/users?page=${page}`).pipe(
      tap(data => this.cache.set(cacheKey, data)),
      catchError(this.handleError)
    );
  }

  getUser(id: number): Observable<any> {
    const cacheKey = `user-${id}`;
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }
    return this.http.get<any>(`https://reqres.in/api/users/${id}`).pipe(
      tap(data => this.cache.set(cacheKey, data)),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error(error);
    return of(null);
  }
}
