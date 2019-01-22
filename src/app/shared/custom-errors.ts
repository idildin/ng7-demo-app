import { ErrorMessage } from 'ng-bootstrap-form-validation';

export const CUSTOM_ERRORS: ErrorMessage[] = [
  {
    error: 'server',
    format: serverFormat
  }
];

export function serverFormat(label: string, error: any): string {
  return error;
}
