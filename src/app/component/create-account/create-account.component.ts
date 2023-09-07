import { Component } from '@angular/core';
import { AngularFireAuth }  from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Utilisez le chemin d'importation correct
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  email: string = '';
  password: string = '';
  role: string = 'user'; // Par défaut, sélectionnez le rôle "Utilisateur"

  constructor(
    private fireauth: AngularFireAuth,
    private firestore: AngularFirestore,
    private authService: AuthService, // Injectez votre AuthService ici
    private router: Router
  ) { }

  onSubmit() {
    this.authService.createUserWithEmailAndPassword(this.email, this.password, this.role)
      .then(user => {
        console.log('Utilisateur créé avec succès:', user);
        alert('Utilisateur créé avec succès:');
        // Réinitialiser les champs du formulaire si nécessaire
        this.email = '';
        this.password = '';
        this.role = 'user';
      })
      .catch(error => {
        console.error('Erreur lors de la création d\'utilisateur:', error);
      });
  }
}
