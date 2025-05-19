import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../services/firebase/firebase.service';

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  firebaseServ=inject(FirebaseService)

  cinguettioText = "";

  cinguetta(){
    this.firebaseServ.postCiguettio(this.cinguettioText);
    this.cinguettioText = "";
  }
}
