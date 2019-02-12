import { Component, OnInit } from '@angular/core';

import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  title: string = "Login"
  buttonTitle: string = "SignUp!"
  bool: boolean = true;

  toggleView() {
    this.bool = !this.bool;
    console.log(this.bool)
    let login = document.getElementById("login");
    let signup = document.getElementById("signup");
    
    if(this.bool == true){
      login.style.display = "block";
      signup.style.display = "none";
      this.title = "Login"
      this.buttonTitle = "SignUp!"
    } else {
      login.style.display = "none";
      signup.style.display = "block";
      this.title = "Signup"
      this.buttonTitle = "Login!"
    }
  }

  sendLogin(username: string, password: string): any{
    event.preventDefault();
    if(username == "" || password == ""){
      document.getElementById("warningDiv").style.display = "block";
      document.getElementById("warning").innerText  = "Please fill in all fields before trying to log in. Thanks! 😀";
      return
    }
    this.authService.loginFetch(username, password);
  }

  sendSignup(firstName: string, lastName: string, email: string, username:string, password: string, confirmPassword: string): any {
    event.preventDefault();

    let warningDiv = document.getElementById("warningDiv");
    let warning = document.getElementById("warning");

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
    this.authService.signupFetch(firstName, lastName, email, username, password);
  }

  hideWarning(){
    document.getElementById("warningDiv").style.display = "none";
    document.getElementById("warning").innerText  = "";
  }

}
