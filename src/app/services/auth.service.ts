import { Injectable } from '@angular/core';
import { AngularFireAuth }  from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Utilisez le chemin d'importation correct
import { User, Agent } from '../model/user';
import { map, switchMap, take } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private fireauth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router) { }




//-----------------------------------------------------------------------------------------------------------------------
   
  async getUserRole(): Promise<string | null> {
    const currentUser = await this.fireauth.currentUser;

    if (!currentUser) {
      return null;
    }

    try {
      const docSnapshot = await this.firestore
        .collection('users')
        .doc(currentUser.uid)
        .get()
        .toPromise();

      if (docSnapshot && docSnapshot.exists) {
        const userData = docSnapshot.data() as User;
        if (userData && userData.roles && userData.roles.length > 0) {
          return userData.roles[0]; // Suppose que l'utilisateur a un seul rôle
        }
      }

      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération du rôle depuis Firestore:', error);
      return null;
    }
  } 
    
    



  


//--------------------------------------------------------------------------------------------------------------------------

  // Méthode pour créer un compte en fonction du rôle (admin ou agent)

  createAccount(user: User | Agent , password: string) {
    let createUserPromise: Promise<any>;

    if ('roles' in user && user.roles.includes('agent')) {
      createUserPromise = this.createAgentAccount(user as Agent, password);
    } else if ('roles' in user && user.roles.includes('admin')) {
      createUserPromise = this.createAdminAccount(user as User, password);
    } else {
      return Promise.reject('Rôle non pris en charge');
    }

    return createUserPromise
      .then(() => {
        // Rediriger l'utilisateur vers la page appropriée après la création du compte
        this.router.navigate(['dashboard']);
      })
      .catch((error) => {
        console.error('Erreur lors de la création du compte :', error);
        // Gérer les erreurs ici (par exemple, afficher un message à l'utilisateur)
        throw error;  // Vous pouvez choisir de rejeter l'erreur ici si nécessaire
      });
  }

// Méthode pour créer un compte admin
private createAdminAccount(user: User, password: string) {
  return this.fireauth.createUserWithEmailAndPassword(user.email, password)
    .then((res) => {
      const newUser: User = {
        uid: res.user?.uid || '',
        email: user.email,
        displayName: user.displayName,
        roles: ['admin']
      };
      return this.firestore.collection('users').doc(newUser.uid).set(newUser);
    })
    .catch((err) => {
      alert(err.message);
      throw err;
    });
}
  


// Méthode pour créer un compte agent par l'administrateur
createAgentAccount(agent: Agent, password: string) {
  return this.fireauth.createUserWithEmailAndPassword(agent.email, password)
    .then((res) => {
      const user: User = {
        uid: res.user?.uid || '',
        email: agent.email,
        displayName: agent.displayName,
        roles: ['agent']
      };

      return this.firestore.collection('users').doc(user.uid).set(user);
    })
    .catch((err) => {
      alert(err.message);
    });
}




//--------------------------------------------------------------------------------------------------------------------------


  login(email: string, password: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.fireauth.signInWithEmailAndPassword(email, password)
        .then(() => {
          localStorage.setItem('token', 'true');
          resolve();
        })
        .catch(err => {
          reject(err.message);
        });
    });
  }
  
  
//--------------------------------------------------------------------------------------------------------------------------


  

    register(email : string, password : string) {
      this.fireauth.createUserWithEmailAndPassword(email, password)
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

 

   //sign in with google
   googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

      this.router.navigate(['/dashboard/tableaubord']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));

    }, err => {
      alert(err.message);
    })
  }




    
}
