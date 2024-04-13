export enum SignUpErrorResponse {
  emailIsRequired = "email is required",
  passwordIsRequired = "password is required",
  displayNameIsRequired = "display name is required",
  emailAlreadyExists = "email already exists",
}
export enum SignInErrorResponse {
  passwordOrEmailIsNotMatch = "password or email is incorrect",
}
