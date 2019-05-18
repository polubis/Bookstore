
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cut'
})
export class CutTextPipe implements PipeTransform {
  transform(value: string, limit = 20) {
    if (!value) {
      return '';
    }
    if (value.length > limit) {
      return value.substring(0, limit) + '...';
    } else {
      return value;
    }
  }
}
