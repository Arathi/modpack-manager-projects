interface SearchResults<ResultType> {
  results: ResultType[];
  pagination: Pagination;
}

interface Pagination {
  index: number;
  pageSize: number;
  amount: number;
  total: number;
}

export default SearchResults;
