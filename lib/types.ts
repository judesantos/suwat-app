
export type ApiResponse<T = object> = {
  success: true;
  data: T 
} | { 
  success: false;
  error: string
};