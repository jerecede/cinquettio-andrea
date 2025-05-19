import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authServ = inject(AuthService)

  email: string = ""
  password: string = ""

  login(){
    console.log(this.email, this.password)
    this.authServ.firebaseLogin(this.email, this.password)
  }

}
