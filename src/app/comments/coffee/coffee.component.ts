import { Component, OnInit } from '@angular/core';

import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

import {AuthComponent} from "../../auth/auth.component";
import {Comments} from "../../models/comments.model";
import {CommentsService} from "../../services/comments.service";

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css']
})
export class CoffeeComponent implements OnInit {
  public commentsArr = []
  private userName;
  private AdminStatus;
  public commentId;
  constructor(private commentsService: CommentsService, private modalService: NgbModal) { }

  ngOnInit() {
    this.userName = sessionStorage.getItem("username")
    this.AdminStatus = sessionStorage.getItem("adminStatus")
    this.sendCoffeeGet()
  }

  open(content?, commentId?: number, username?){
    if(content){
      this.modalService.open(content, {ariaLabelledBy: "modal-basic-title"}).result;
      console.log("edit pushed")
      this.commentId = commentId;
      this.userName = username;
      console.log(commentId, this.commentId);
    } else {
      this.modalService.dismissAll();
    }
  }

  sendCommentUpdate(commentEdit){
    event.preventDefault();
    console.log("update pushed", commentEdit, this.commentId)
    let commentObj: Comments = {
      commentdata: {
        username: this.userName,
        comment: commentEdit.trim(),
        typeOf: "Coffee",
        votes: 0
      }
    }
    this.commentsService.commentsUpdateFetch(commentObj, this.commentId).subscribe(data => console.log(data))
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

  deleteConfirm(commentId?: number): void{
    if(commentId){
      this.commentId = commentId
    }
    if(document.getElementById("deleteConfirm").style.display == "none"){
      document.getElementById("deleteConfirm").style.display = "block"
    } else {
      document.getElementById("deleteConfirm").style.display = "none"
    }
  }

  sendDeleteFetch(commentId: number): void{
    return this.commentsService.deleteComment(commentId).subscribe(console.log("successfully deleted"))
  }
}