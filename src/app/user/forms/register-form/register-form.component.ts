import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services';
import { collectBackendErrors } from '../../../shared';

@Component({
  selector: 'user-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.sass']
})
export class RegisterFormComponent implements OnInit {

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
      'email': [null, [
        Validators.required,
        Validators.email
      ]],
      'terms': [null, [
        Validators.requiredTrue
      ]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      this.submitted = false;
      return;
    }

    this.userService.createUser(this.form.value.email)
      .subscribe(
        () => {
          this.success = true;
          this.submitted = false;
          this.errorMsg = '';
          this.form.reset();
        },
        error => this.handleSubmitError(error),
      );
  }

  protected handleSubmitError(error: any) {
    this.submitted = false;
    if (error.status === 400) {
      const errorData = error.error.errors.children;
      collectBackendErrors(this.form.controls, errorData);
    }
  }

}
