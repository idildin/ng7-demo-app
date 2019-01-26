import { ErrorMessage } from 'ng-bootstrap-form-validation';

export const CUSTOM_ERRORS: ErrorMessage[] = [
  {
    error: 'server',
    format: serverFormat
  },
  {
    error: 'matchPassword',
    format: matchPasswordFormat
  },
];

export function serverFormat(label: string, error: any): string {
  return error.join(' ');
}

export function matchPasswordFormat(): string {
  return 'Password not match';
}
