import { Injectable } from '@angular/core';
import { AngularFireAuth }  from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Utilisez le chemin d'importation correct




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private fireauth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router) { }

  // login method
  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
        localStorage.setItem('token','true');

        if(res.user?.emailVerified == true) {
          this.router.navigate(['dashboard/ajout-prospect']);
          // window.location.reload();
       
        } else {
          // this.router.navigate(['/varify-email']);
        }

    }, err =>{
      alert(err.message);
    //  this.router.navigate(['/login']);
        })
  }



  

    // register method
    register(email : string, password : string) {
      this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
        alert('Un Email vous a ete envoyer veuillez confirmer');
        this.sendEmailForVarification(res.user);
        this.router.navigate(['/login']);
      }, err => {
        alert(err.message);
        this.router.navigate(['/register']);
      })
    }

  //sign out
  logout() {
    this.fireauth.signOut()
      .then(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      })
      .catch(err => {
        alert(err.message);
      });
  }

    // forgot password
    forgotPassword(email : string) {
      this.fireauth.sendPasswordResetEmail(email).then(() => {
        this.router.navigate(['/varify-email']);
      }, err => {
        alert('Something went wrong');
      })
  }

   // email varification
   sendEmailForVarification(user : any) {
    console.log(user);
    user.sendEmailVerification().then((res : any) => {
      this.router.navigate(['/varify-email']);
    }, (err : any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }

   //sign in with google
   googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

      this.router.navigate(['/dashboard']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));

    }, err => {
      alert(err.message);
    })
  }



  // Créer un utilisateur avec un rôle
  async createUserWithEmailAndPassword(email: string, password: string, role: string) {
    try {
      const userCredential = await this.fireauth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
  
      if (user) {
        // Ajouter l'utilisateur avec son rôle à Firestore
        await this.firestore.collection('users').doc(user.uid).set({
          email: user.email,
          role: role
        });
  
        return user;
      } else {
        throw new Error('Utilisateur null après la création');
      }
    } catch (error) {
      console.error('Erreur de création d\'utilisateur :', error);
      throw error;
    }
  }
  

  
  
}
