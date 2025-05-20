import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: "list", component: ListComponent},
    {path: "login", component: LoginComponent, canActivate:[authGuard]},
    {path: "registration", component: RegistrationComponent, canActivate:[authGuard]},
    {path: "**", redirectTo: "/list", pathMatch: "full"}
];
