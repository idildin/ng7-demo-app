export class ChangePassword {
  currentPassword: string;
  password: PasswordRepeated;
}

export class PasswordRepeated {
  newPassword: string;
  confirmPassword: string;
}
