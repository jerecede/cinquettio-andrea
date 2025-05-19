import { inject, Injectable, signal } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  firebaseServ = inject(FirebaseService)

  isAuth = signal<boolean>(false);

  constructor() {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        console.log('auth change authorized', user)
        this.isAuth.set(true);
        // ...
      } else {
        // User is signed out
        // ...
        console.log('auth change unauthorized')
        this.isAuth.set(false);
      }
    });



  }

  firebaseLogin(email: string, password: string) {

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        console.log('evviva', user);

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log('dannazione', errorCode, errorMessage);
      });

  }

  firebaseLogout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }


  firebaseRegister(email: string, password: string, nick: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user);

        this.firebaseServ.saveUser(user.uid, nick);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }



}
