import { Component, OnInit } from '@angular/core';

import {Comments} from "../../models/comments.model";
import {CommentsService} from "../../services/comments.service";

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css']
})
export class CoffeeComponent implements OnInit {

  constructor(private commentsService: CommentsService) { }

  ngOnInit() {
    this.sendCoffeeGet()
  }

  sendCoffeeGet(){
    this.commentsService.commentsGetFetch().subscribe(data => console.log(data))
  }

  sendCoffeeFetch(comment: string): any{
    event.preventDefault();
    if(comment.trim() == "" || comment == null || comment == undefined){
      console.log("this comment is blank")
      return
    }
      console.log("this comment has value")
      let commentObj: Comments = {
        commentdata: {
          username: sessionStorage.getItem("username"),
          comment: comment.trim(),
          typeOf: "Coffee",
          votes: 0
        }
      }
      this.commentsService.commentsPostFetch(commentObj).subscribe(data => console.log(data))
  }
}
