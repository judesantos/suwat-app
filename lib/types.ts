
export type ApiResponse<T = object> = {
  success: true;
  data: T 
} | { 
  success: false;
  error: T
};

export enum Role {
  USER,
  ADMIN
}

export type User = {
  id: number,
  fullName: string,
  userName: string,
  email: string,
  password?: string
};

export enum DbStatusCode {
  FAILED = -1,
  SUCCESS = 0,
  UNIQUE_ENTRY_VIOLATION = 1000,
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
  INVALID_VALUE = DbStatusCode.INVALID_VALUE,
  MISSING_VALUE = DbStatusCode.MISSING_VALUE,
  UNDEFINED_ERROR = DbStatusCode.UNDEFINED_ERROR,
  UNKNOWN_ERROR = DbStatusCode.UNKNOWN_ERROR
};

export type AppResponse = {
  status: StatusCode,
  message?: string
};
