import { inject, Injectable, signal } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { FirebaseService } from '../firebase/firebase.service';
import { User } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  firebaseServ = inject(FirebaseService)

  isAuth = signal<boolean>(false);

  userData = signal<User | null>(null);

  constructor() {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        console.log('auth change authorized', user)
        this.isAuth.set(true);
        this.firebaseServ.getUser(user.uid).then((data: any) => {
          this.userData.set({
            id: user.uid,
            nick: data.nick,
            email:user.email!,
            creationTime: new Date(user.metadata.creationTime!),
            lastLogin: new Date(user.metadata.lastSignInTime!)
          })
        });
        // ...
      } else {
        // User is signed out
        // ...
        console.log('auth change unauthorized')
        this.userData.set(null);
        this.isAuth.set(false);
      }
    });



  }

  firebaseLogin(email: string, password: string): Promise<UserCredential> {

    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
  }

  firebaseLogout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }


  firebaseRegister(email: string, password: string, nick: string): Promise<string> {
    const auth = getAuth();
    
    const promise = new Promise<string>((resolve, reject) => {
       createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user);

        this.firebaseServ.saveUser(user.uid, nick);

        resolve("Bella storia!")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        reject(errorMessage);
      });
    })
    
    return promise;
  }



}
