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
import { ProfileFormComponent } from './forms/profile-form/profile-form.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

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
    ProfileFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
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
