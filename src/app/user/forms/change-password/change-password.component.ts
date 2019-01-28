import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services';
import { ChangePassword } from '../../models';
import { collectBackendErrors } from '../../../shared';

@Component({
  selector: 'user-change-password-form',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.sass']
})
export class ChangePasswordComponent implements OnInit {

  private form: FormGroup;
  public submitted = false;
  public success = false;
  public errorMsg: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      'currentPassword': [null, [
        Validators.required,
      ]],
      'password': this.fb.group({
        'newPassword': [null, [
          Validators.required,
          Validators.minLength(4)
        ]],
        'confirmPassword': [null, [
          Validators.required
        ]]
      })
    }, {
      validator: this.checkPasswords
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      this.submitted = false;
      return;
    }

    const formData: ChangePassword = Object.assign({}, this.form.value);

    this.userService.changePassword(formData)
      .subscribe(
        () => {
          this.success = true;
          this.submitted = false;
          this.errorMsg = '';
          this.form.reset();
        },
        error => this.handleSubmitError(error)
      );
  }

  protected handleSubmitError(error: any) {
    this.submitted = false;
    if (error.status === 400) {
      const errorData = error.error.errors.children;
      collectBackendErrors(this.form.controls, errorData);
    }
  }

  private checkPasswords(formGroup: FormGroup) {
    const newPassword = formGroup.get('password').get('newPassword').value;
    const confirmPassword = formGroup.get('password').get('confirmPassword').value;

    if (newPassword !== confirmPassword) {
      formGroup.get('password').get('confirmPassword').setErrors({
        'matchPassword': true
      });
    }

    return null;
  }

}
