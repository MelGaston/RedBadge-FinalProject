import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable, of} from "rxjs";
import{catchError, map, tap} from "rxjs/operators";

import {Comments} from "../models/comments.model";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization" : sessionStorage.getItem("token")
  })
}
@Injectable({
  providedIn: 'root'
})
export class CommentsService {
private baseURL: string = "https://hbh-server.herokuapp.com/";
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    return of(result as T);
  };
}
  constructor(private http: HttpClient) { }

  commentsPostFetch(comment: Comments): any{
    return this.http.post<Comments>(`${this.baseURL}comment/create`, comment, httpOptions).pipe(
      catchError(this.handleError("commentsPostFetch")),
      tap(comment => {
        return comment;
      })
    )
  }

  commentsUpdateFetch(comment: Comments, commentId: number): any{
    console.log("service", comment, commentId)
    return this.http.put<Comments>(`${this.baseURL}comment/update/${commentId}`, comment, httpOptions).pipe(
      catchError(this.handleError("commentsUpdateFetch"))
    )
  }

  commentsGetFetch(): any{
    return this.http.get<Comments>(`${this.baseURL}comment/comments`, httpOptions).pipe(
      catchError(this.handleError("commentsGetFetch")),
      tap(comment => {
        return comment;
      })
    )
  }

  deleteComment(commentId): any{
    return this.http.delete<Comments>(`${this.baseURL}comment/remove/${commentId}`, httpOptions).pipe(
      catchError(this.handleError<Comments>("deleteComment"))
    )
  }
}
