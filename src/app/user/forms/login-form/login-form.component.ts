import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'user-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass']
})
export class LoginFormComponent implements OnInit {

  private form: FormGroup;
  public submitted = false;
  public errorMsg: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      'email': [null, [
        Validators.required,
        Validators.email
      ]],
      'password': [null, [
        Validators.required,
      ]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      this.submitted = false;
      return;
    }

    this.authService
      .login(this.form.controls.email.value, this.form.controls.password.value)
      .subscribe(
        () => this.router.navigate(['/']),
        error => {
          this.submitted = false;
          this.errorMsg = error.error.message;
        }
      );
  }
}
