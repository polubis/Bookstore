import { MatPaginatorIntl } from '@angular/material';

const dutchRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 na ${length}`; }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  const endIndex = startIndex < length ?
    Math.min(startIndex + pageSize, length) :
    startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} na ${length}`;
}


export function getDutchPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Liczba elementów na stronę';
  paginatorIntl.nextPageLabel = 'Kolejna strona';
  paginatorIntl.previousPageLabel = 'Poprzednia strona';
  paginatorIntl.getRangeLabel = dutchRangeLabel;

  return paginatorIntl;
};