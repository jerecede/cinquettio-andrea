import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

export const routes: Routes = [
    {path: "list", component: ListComponent},
    {path: "login", component: LoginComponent},
    {path: "registration", component: RegistrationComponent},
    {path: "**", redirectTo: "/list", pathMatch: "full"}
];
