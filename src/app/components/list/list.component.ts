import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { FormComponent } from "../form/form.component";
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-list',
  imports: [FormComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  firebaseServ = inject(FirebaseService)
  authServ = inject(AuthService)
}
