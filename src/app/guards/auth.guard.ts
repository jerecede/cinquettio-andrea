import { inject } from '@angular/core';
import { CanActivateFn, GuardResult, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const authGuard: CanActivateFn = (route, state) => {
  // const authServ = inject(AuthService);
  const router = inject(Router);

  // //signal possono essere convertite in observable
  // const observableAuth  = toObservable(authServ.isAuth);

  // return observableAuth.pipe(
  //   map(value => {
  //     if(value){
  //       return router.createUrlTree(['/list'])
  //     } else {
  //       return true;
  //     }
  //   })
  // )

  const promise = new Promise<GuardResult>((resolve, _) => { //GuardResult = boolean | route
    onAuthStateChanged(getAuth(), (user) => { //chiedo direttamente l'autenticazione, non aspetto che cambi
      if(user){ //utente loggato
        resolve(router.createUrlTree(['/list']));
      } else {
        resolve(true);
      }
    })
  })

  return promise;
};
