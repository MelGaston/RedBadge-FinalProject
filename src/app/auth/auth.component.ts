import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AuthService} from "../services/auth.service";
import {CommentsService} from "../services/comments.service";
import {User} from "../models/user.model"
import {UserLogin} from "../models/userLogin";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private commentsService: CommentsService, private router: Router) { }

  ngOnInit() {
    this.setSessionToken()
  }

  title: string = "Log In"
  buttonTitle: string = "Sign Up"
  bool: boolean = true;

  setSessionToken(): void{
    sessionStorage.setItem("token", "")
    sessionStorage.setItem("adminStatus", null)
    sessionStorage.setItem("username", "");
  }

  toggleView() {
    this.bool = !this.bool;
    console.log(this.bool)
    let login = document.getElementById("login");
    let signup = document.getElementById("signup");
    
    if(this.bool == true){
      login.style.display = "block";
      signup.style.display = "none";
      this.title = "Log In"
      this.buttonTitle = "Sign Up"
    } else {
      login.style.display = "none";
      signup.style.display = "block";
      this.title = "Sign Up"
      this.buttonTitle = "Log In"
    }
  }

  sendLogin(username: string, password: string): any{
    event.preventDefault();
    if(username == "" || password == ""){
      document.getElementById("warningDiv").style.display = "block";
      document.getElementById("warning").innerText  = "Please fill in all fields before trying to log in. Thanks! 😀";
      return
    }
    let user: UserLogin = {
      user:{
        username: username,
        password: password
      }
    }
    this.authService.loginFetch(user)
    .subscribe(data => {
      sessionStorage.setItem("token", data.sessionToken);
      sessionStorage.setItem("adminStatus", data.user.adminStatus);
      sessionStorage.setItem("username", data.user.username)
      console.log(data);
      this.goHome();
      console.log(data.user.adminStatus);
      this.sendToCommentService(data.user.adminStatus);
    })
    console.log("sessionToken token", sessionStorage.getItem("token"));
    
  }

  sendToCommentService(adminStatus){
    this.commentsService.getAdminStatus(adminStatus);
  }

  sendSignup(firstName: string, lastName: string, email: string, username:string, password: string, confirmPassword: string): any {
    event.preventDefault();

    let warningDiv = document.getElementById("warningDiv");
    let warning = document.getElementById("warning");
    let user: User = {
      user:{
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password,
        adminStatus: false
      }
    }

    if(password != confirmPassword){
      warningDiv.style.display = "block";
      warning.innerText = "Your passwords do not match, please try again";
      return
    }
    if(firstName == "" || lastName == "" || email == "" || username == "" || password == "" || confirmPassword == ""){
      warningDiv.style.display = "block";
      warning.innerText = "Please fill all fields before submitting";
      return
    }
    this.authService.signupFetch(user)
      .subscribe(data => {
        sessionStorage.setItem("token", data.sessionToken);
        sessionStorage.setItem("adminStatus", data.user.adminStatus);
        sessionStorage.setItem("username", data.user.username);
        console.log(data);
        setTimeout(() => {
          this.goHome();
        }, 5000)
  });
    console.log("sessionToken token", sessionStorage.getItem("token"));
    console.log("adminStatus", sessionStorage.getItem("adminStatus"));
  }

  hideWarning(){
    document.getElementById("warningDiv").style.display = "none";
    document.getElementById("warning").innerText  = "";
  }

  goHome() {
    if(sessionStorage.getItem("token") !== "") {
      console.log(sessionStorage.getItem("token"));
      this.router.navigate(['/home']);
    }
  }

}
