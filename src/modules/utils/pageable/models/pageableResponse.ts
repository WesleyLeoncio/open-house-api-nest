export interface PageableResponse<T> {
  totalElements: number;
  content: T[],
  totalPages: number;
  currentPage: number;
}