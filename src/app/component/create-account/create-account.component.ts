import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; // Assurez-vous d'importer correctement votre service AuthService
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {


 
  email: string = '';
  password: string = '';
  displayName: string = '';
  role: string = ''; // Par défaut, sélectionnez le rôle "Agent"


 
  constructor(
    private fireauth: AngularFireAuth,
    private authService: AuthService,
    private router: Router, private auth : AuthService
  ) { }

  createAccount() {
    if (this.email && this.password && this.displayName) {
      const user = {
        email: this.email,
        displayName: this.displayName,
        roles: [this.role] // Rôle sélectionné par l'utilisateur
        
      };

      this.authService.createAccount(user, this.password)
        .then(() => {
          // Rediriger l'utilisateur vers la page appropriée après la création du compte
          this.router.navigate(['dashboard/create-account']);
          Swal.fire({
            heightAuto: false,
            icon: 'success',
            text: 'Compte cree avec succès',
            showConfirmButton: false,
            timer: 2500
          })
        })
        .catch((error) => {
          console.error('Erreur lors de la création du compte :', error);
          // Gérer les erreurs ici (par exemple, afficher un message à l'utilisateur)
        });
    } else {
      // Gérer le cas où des champs sont vides
      // console.error('Veuillez remplir tous les champs.');
      Swal.fire({
        heightAuto: false,
        icon: 'error',
        text: 'Remplissez tous les champs de saisie',
        showConfirmButton: false,
        timer: 2500
      })
      return;
    }
  }



  
 
}
