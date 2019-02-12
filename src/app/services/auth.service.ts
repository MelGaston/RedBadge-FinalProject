import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";


const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization" : "pie" //sessionStorage.getItem(token)
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loginFetch(username: string, password: string): void{
    console.log("authService loginFetch", username, password)
  }

  signupFetch(firstName, lastName, username, email, password): void {
    console.log("authService signupFetch", firstName, lastName, username, email, password);
  }
}


