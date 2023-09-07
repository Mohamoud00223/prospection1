import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email : string = '';
  password : string = '';

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  login() {

    if(this.email == '') {
      alert('Entrez votre email');
      return;
    }

    if(this.password == '') {
      alert('Entrez votre mot de passe');
      return;
    }

    this.auth.login(this.email,this.password);
    
    this.email = '';
    this.password = '';
    
 

  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }
 

  
  // logout() {
  //   this.auth.logout();
  // }
}