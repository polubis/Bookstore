import { Injectable } from '@angular/core';
import { DataEnhancer } from '../models/others/DataEnhancer';

@Injectable({
  providedIn: 'root'
})
export class DataEnhancerService {
  extendArray<T>(oldElement: DataEnhancer<T[]>, elementToAdd: T) {
    return {
      ...oldElement,
      data: [elementToAdd, ...oldElement.data]
    };
  }
}

