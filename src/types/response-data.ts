export interface Errors {
  [field: string]: string[];
}

export interface PaginationMeta {
  total: number;
  page: number;
  pages: number;
  limit: number;
}

export interface ResponseData<T> {
  success: boolean;
  message: string;
  data: T | null;
  meta?: PaginationMeta;
  errors?: Errors;
}
