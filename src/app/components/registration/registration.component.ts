import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [FormsModule, RouterModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  authServ = inject(AuthService);
  router = inject(Router);

  email: string = ""
  password: string = ""
  nick: string = ""

  register(){
    console.log(this.email, this.password)
    this.authServ.firebaseRegister(this.email, this.password, this.nick).then(_ => {
      this.router.navigate(['list']);
    }).catch(error => console.log(error))
  }
}
