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

export type User = {
  id: number;
  fornavn: string;
  etternavn: string;
  brukernavn: string;
  isAdmin: boolean;
  delerStat: boolean;
};
