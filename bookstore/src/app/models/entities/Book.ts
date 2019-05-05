export class Book {
  constructor(
    public name: string,
    public author: string,
    public printer: string,
    public kindOfBookName: string,
    public price: number,
    public description: string,
    public pictureName: string,
    public id: string,
  ) {
  }
}

export interface Books {
  currentPage: number;
  firstRowOnPage: number;
  lastRowOnPage: number;
  pageCount: number;
  pageSize: number;
  results: Book[];
  rowCount: number;
}
