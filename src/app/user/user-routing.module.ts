import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  ForgotPasswordComponent,
  LoginComponent,
  ProfileComponent,
  RegisterComponent
} from './pages';
import { AuthGuard } from '../guards';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'password/forgot',
    component: ForgotPasswordComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
