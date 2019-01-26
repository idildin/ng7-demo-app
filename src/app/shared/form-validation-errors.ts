import {
  AbstractControl,
  FormGroup
} from '@angular/forms';

export interface FormGroupControls {
  [key: string]: AbstractControl;
}

export function collectBackendErrors(controls: FormGroupControls, errors) {
  Object.keys(controls).forEach(key => {
    const control = controls[ key ];
    if (control instanceof FormGroup) {
      collectBackendErrors(control.controls, errors[ key ].children);
    }
    if (errors[ key ].hasOwnProperty('errors')) {
      control.setErrors({
        'server': errors[ key ].errors,
      });
    }
  });
}
