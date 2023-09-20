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

  constructor(private auth : AuthService, private router: Router) { }

  ngOnInit(): void {
  }




  login() {
    if (this.email === '') {
      alert('Entrez votre email');
      return;
    }

    if (this.password === '') {
      alert('Entrez votre mot de passe');
      return;
    }

    // Appeler la méthode de connexion et récupérer le rôle de l'utilisateur
    this.auth.login(this.email, this.password)
      .then(() => {
        this.auth.getUserRole()
          .then(userRole => {
            if (userRole === 'agent') {
              console.log('Rôle agent');
              this.router.navigate(['dashboard/liste-prospect']); // Rediriger l'agent vers la liste des prospects
            } else if (userRole === 'admin') {
              console.log('Rôle admin');
              this.router.navigate(['dashboard/tableaubord']); // Rediriger l'admin vers le tableau de bord
            } else {
              // Gérer d'autres rôles si nécessaire
            }
          })
          .catch(error => {
            console.error('Erreur lors de la récupération du rôle depuis Firestore :', error);
            alert('Erreur lors de la récupération du rôle depuis Firestore : ' + error);
          });
      })
      .catch(error => {
        alert('Erreur lors de la connexion : ' + error);
      });

    this.email = '';
    this.password = '';
  }

  


  

  signInWithGoogle() {
    this.auth.googleSignIn();
  }
 

  
}