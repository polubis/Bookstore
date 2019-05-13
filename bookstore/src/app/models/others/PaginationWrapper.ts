export interface PaginationWrapper<S> {
  currentPage?: number;
  firstRowOnPage?: number;
  lastRowOnPage?: number;
  pageCount?: number;
  pageSize?: number;
  results: S[];
  rowCount?: number;
}
