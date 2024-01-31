import { PageableResponse } from './models/pageableResponse';
import { Pagination } from './models/pagination';

export class Pageable<T> {

  page: number;
  take: number;
  skip: number;
  filter: string;
  pagination: Pagination;

  constructor(page: number = 0, size: number = 3, filter: string = '') {
    this.page = page;
    this.take = size;
    this.skip = page ? page * this.take : 0;
    this.filter = filter;
    this.pagination = { take: this.take, skip: this.skip, filter: this.filter };
  }

  getPageableData(totalElements: number, content: T[]): PageableResponse<T> {
    const currentPage: number = this.page ? +this.page : 0;
    const totalPages: number = Math.ceil(totalElements / this.take);
    return { totalElements, content, totalPages, currentPage };
  }


}