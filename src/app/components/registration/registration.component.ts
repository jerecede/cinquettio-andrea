import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  authServ = inject(AuthService)

  email: string = ""
  password: string = ""
  nick: string = ""

  register(){
    console.log(this.email, this.password)
    this.authServ.firebaseRegister(this.email, this.password, this.nick)
  }
}
