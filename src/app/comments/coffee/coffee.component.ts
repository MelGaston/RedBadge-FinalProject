import { Component, OnInit } from '@angular/core';

import {Comments} from "../../models/comments.model";
import {CommentsService} from "../../services/comments.service";

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css']
})
export class CoffeeComponent implements OnInit {
  private commentsArr = []
  constructor(private commentsService: CommentsService) { }

  ngOnInit() {
    this.sendCoffeeGet()
  }

  sendCoffeeGet(){
    this.commentsService.commentsGetFetch().subscribe(data => {
      let i = 0
      while(i < data.comment.length){
        if(data.comment[i].typeOf == "Coffee"){
          this.commentsArr.push(data.comment[i])
        }
        i++;
      }
    })
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
