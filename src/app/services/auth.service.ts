import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";

import {User} from "../models/user.model";
import {UserLogin} from "../models/userLogin";


const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization" : sessionStorage.getItem("token")
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL: string = "https://hbh-server.herokuapp.com/";
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  constructor(
    private http: HttpClient
  ) { }

  loginFetch(user: UserLogin): any{
    return this.http.post<User>(`${this.baseURL}auth/signin`, user, httpOptions).pipe(
      catchError(this.handleError("loginFetch")),
      tap(user => {
        return user
      })
    )
  }

  signupFetch(user: User): any {
    return this.http.post<User>(`${this.baseURL}auth/signup`, user, httpOptions).pipe(
      catchError(this.handleError("signupFetch")),
      tap(user => {
        return user
      })
    )
  }
}


