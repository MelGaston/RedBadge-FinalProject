import { Component, OnInit } from '@angular/core';

import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

import {Comments} from "../../models/comments.model";
import {CommentsService} from "../../services/comments.service";

@Component({
  selector: 'app-misc-bev',
  templateUrl: './misc-bev.component.html',
  styleUrls: ['./misc-bev.component.css']
})
export class MiscBevComponent implements OnInit {
  private commentsArr = []
  private userName;
  private AdminStatus;
  private commentId;
  constructor(private commentsService: CommentsService, private modalService: NgbModal) { }

  ngOnInit() {
    this.userName = sessionStorage.getItem("username")
    this.AdminStatus = sessionStorage.getItem("adminStatus")
    this.sendMiscGet()
  }

  open(content?, commentId?: number){
    if(content){
      this.modalService.open(content, {ariaLabelledBy: "modal-basic-title"}).result;
      console.log("edit pushed")
      this.commentId = commentId
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
        username: sessionStorage.getItem("username"),
        comment: commentEdit,
        typeOf: "Misc",
        votes: 0
      }
    }
    this.commentsService.commentsUpdateFetch(commentObj, this.commentId).subscribe(data => console.log(data))
  }

  sendMiscGet(){
    this.commentsService.commentsGetFetch().subscribe(data => {
      let i = 0;
      while(i < data.comment.length){
        if(data.comment[i].typeOf == "Misc"){
          this.commentsArr.push(data.comment[i])
        }
        i++;
      }
    })
  }

  sendMiscFetch(comment: string): any{
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
          typeOf: "Misc",
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