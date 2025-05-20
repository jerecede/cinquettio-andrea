import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authServ = inject(AuthService)
  router = inject(Router);

  email: string = ""
  password: string = ""

  login(){
    console.log(this.email, this.password)
    this.authServ.firebaseLogin(this.email, this.password).then(_ => {
      this.router.navigate(['list']);
    }).catch(error => console.log(error.message))
  }

}
