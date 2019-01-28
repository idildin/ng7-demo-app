import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from '../../models';
import { UserService} from '../../services';
import { collectBackendErrors } from '../../../shared';

@Component({
  selector: 'user-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.sass']
})
export class ProfileFormComponent implements OnInit {

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
      'firstName': [null, [
        Validators.required,
      ]],
      'lastName': [null],
      'dob': [null]
    });
    this.userService.me().subscribe(
      result => {
        this.form.patchValue(result.profile);
      }
    );
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      this.submitted = false;
      return;
    }

    const formData: Profile = Object.assign({}, this.form.value);

    this.userService.changeProfile(formData)
      .subscribe(
        () => {
          this.success = true;
          this.submitted = false;
          this.errorMsg = '';
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

}
