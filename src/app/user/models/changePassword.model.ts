export class ChangePasswordModel {
  currentPassword: string;
  password: PasswordRepeatedModel;
}

export class PasswordRepeatedModel {
  newPassword: string;
  confirmPassword: string;
}
