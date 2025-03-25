export interface RegisterRequest {
  fornavn: string;
  etternavn: string;
  brukernavn: string;
  passord: string;
}

export type RegisterResponse = string | null;

export type ErrorUserExistCode = 400;

export interface LoginRequest {
  brukernavn: string;
  passord: string;
}

export interface User {
  fornavn: string;
  etternavn: string;
  brukernavn: string;
}
