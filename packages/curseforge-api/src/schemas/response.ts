import type { Pagination } from "./pagination";

export interface DataResponse<D> {
  data: D;
}

export type ListResponse<E> = DataResponse<Array<E>>;

export type PaginatedResponse<E> = ListResponse<E> & {
  pagination: Pagination;
};

export type Response<T> =
  | DataResponse<T>
  | ListResponse<T>
  | PaginatedResponse<T>;
