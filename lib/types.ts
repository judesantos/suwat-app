
export type ApiResponse<T = object> = {
  success: boolean;
  data?: T 
  error?: T
};

export enum Role {
  USER,
  ADMIN
}

export class UserAuthProvider {
  id: number = -1;
  user_id: number = -1;
  provider: string = '';
}

export type User = {
  id?: number,
  fullName: string,
  userName: string,
  email: string,
  password?: string,
  phone: string,
  providers?: UserAuthProvider[]
};

export enum DbStatusCode {
  FAILED = -1,
  SUCCESS = 0,
  RECORD_NOT_FOUND = 500,
  UNIQUE_ENTRY_VIOLATION = 1000,
  CONNECTION_ERROR = 1050,
  INVALID_VALUE = 2000,
  MISSING_VALUE = 3000,
  INVALID_QUERY = 4000,
  UNDEFINED_ERROR = 5000,
  UNKNOWN_ERROR = 6000
}

export type DbError = {
  code: DbStatusCode,
  message: string,
  fields?: string|unknown
}

export type DbResponse = {
  status: DbStatusCode,
  error?: DbError|any,
  result?: any
}

export enum StatusCode {
  FAILED = -1,
  SUCCESS = 0,
  ACCOUNT_EXISTS = DbStatusCode.UNIQUE_ENTRY_VIOLATION,
  NOT_FOUND = DbStatusCode.UNIQUE_ENTRY_VIOLATION + 1,
  INVALID_VALUE = DbStatusCode.INVALID_VALUE,
  MISSING_VALUE = DbStatusCode.MISSING_VALUE,
  UNDEFINED_ERROR = DbStatusCode.UNDEFINED_ERROR,
  UNKNOWN_ERROR = DbStatusCode.UNKNOWN_ERROR
};

export type AppResponse<T = any|null> = {
  status: StatusCode,
  message?: string
  data?: any
};

export type SessionCredential = any;
export type SessionCookie = {
  type: 'internal'|'external',
  token: string
}

export const ServerErrorResponse = {
  UNKNOWN_ERROR: {status: StatusCode.UNKNOWN_ERROR, message: 'Unknown error'},
  UNDEFINED_ERROR: {status: StatusCode.UNDEFINED_ERROR, message: 'Server error'}
};
