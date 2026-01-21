export interface DataResponse<D> {
  data: D;
}

export interface Pagination {
  index: number;
  pageSize: number;
  resultCount: number;
  totalCount: number;
}

export type ListResponse<D> = DataResponse<Array<D>>;

export type PaginationResponse<D> = ListResponse<D> & {
  pagination: Pagination;
};
