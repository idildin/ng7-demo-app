import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { UserService } from '../../services';

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
        },
        error => this.handleSubmitError(error),
      );
  }

  protected handleSubmitError(error: any) {
    this.submitted = false;
    if (error.status === 400) {
      const errorData = error.error.errors.children;
      for (const fieldName in errorData) {
        const control = this.findFieldControl(fieldName);
        if (errorData.hasOwnProperty(fieldName) && errorData[fieldName].hasOwnProperty('errors')) {
          this.addError(control, {
            'server': errorData[fieldName].errors[0]
          });
        }
      }
    }
  }

  findFieldControl(field: string): AbstractControl {
    return this.form.get(field);
  }

  protected addError(control: AbstractControl, error: { [key: string]: any }) {
    const updatedErrors = Object.assign({}, control.errors, error);
    control.setErrors(updatedErrors);
  }

}
