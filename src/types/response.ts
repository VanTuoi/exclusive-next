export interface Errors {
  [field: string]: string[];
}

export interface ResponseData<T> {
  data: T;
  meta?: PaginationMeta;
  statusCode?: string | number;
  statusText?: string;
  message?: string;
  success?: boolean;
  errors: Errors;
}

export interface PaginationMeta {
  total: number;
  page: number;
  pages: number;
  limit: number;
}
