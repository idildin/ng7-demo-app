import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { UserService } from '../../services';

@Component({
  selector: 'user-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.sass']
})
export class ForgotPasswordFormComponent implements OnInit {

  private form: FormGroup;
  public submitted = false;
  public success: boolean;
  public errorMsg: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      'email': [null, [
        Validators.required,
        Validators.email
      ]],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      this.submitted = false;
      return;
    }

    this.userService.forgotPassword(this.form.value.email)
      .subscribe(
        result => this.success = true,
        error => this.errorMsg = error.message,
        () => this.submitted = false
      );
  }

}
