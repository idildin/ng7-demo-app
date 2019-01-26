import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {
  ForgotPasswordComponent,
  LoginComponent,
  ProfileComponent,
  RegisterComponent
} from './pages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ChangePasswordComponent,
  ForgotPasswordFormComponent,
  LoginFormComponent,
  RegisterFormComponent
} from './forms';
import {
  NgBootstrapFormValidationModule,
  CUSTOM_ERROR_MESSAGES
} from 'ng-bootstrap-form-validation';
import { CUSTOM_ERRORS } from '../shared';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    RegisterFormComponent,
    LoginFormComponent,
    ForgotPasswordFormComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    UserRoutingModule
  ],
  providers: [{
    provide: CUSTOM_ERROR_MESSAGES,
    useValue: CUSTOM_ERRORS,
    multi: true
  }]
})
export class UserModule { }
