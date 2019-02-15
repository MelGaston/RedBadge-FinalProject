import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";

import {Cards} from "../models/cards.model"
import {CardsNoNotes} from "../models/cardsNoNotes.model";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization" : sessionStorage.getItem("token")
  })
}

@Injectable({
  providedIn: 'root'
})
export class BevCardService {
  private baseURL: string = "https://hbh-server.herokuapp.com/";
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) { }

  createCardFetch(card: Cards | CardsNoNotes): any {
    return this.http.post<Cards | CardsNoNotes>(`${this.baseURL}card/create`, card, httpOptions).pipe(
      catchError(this.handleError("createCardFetch")),
      tap(data => {
        return data
      })
    )
  }

  getCardFetch(): any {
    return this.http.get<Cards>(`${this.baseURL}card/mine`, httpOptions).pipe(
      catchError(this.handleError("getCardFetch")),
      tap(data => {
        return data
      })
    )
  }
}
