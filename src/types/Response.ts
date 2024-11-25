export interface DataResponse<T> {
  data?: T;
  error?: string;
  success?: boolean;
  status?: number;
}