export const AuthFormInput = {
  name: "name",
  email: "email",
  password: "password",
} as const;

export type AuthFormInputType = keyof typeof AuthFormInput;

export type AuthFormRegister = Record<AuthFormInputType, string>;

export type AuthFormSignIn = Pick<AuthFormRegister, "email" | "password">;

export type AuthFormInput = keyof typeof AuthFormInput;
