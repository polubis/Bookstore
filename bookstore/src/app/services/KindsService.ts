import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './ApiService';
import { RequestResponse } from '../models/others/RequestResponse';
import { DataEnhancer } from '../models/others/DataEnhancer';
import { ServerError } from '../models/others/ServerError';
import { Kind } from '../models/entities/Kind';

@Injectable({
  providedIn: 'root'
})
export class KindsService {

  kinds = new BehaviorSubject<DataEnhancer<Kind[]>>({ isLoading: true, data: [] });

  constructor(private apiService: ApiService) {

  }

  getKinds() {
    this.kinds.next({ isLoading: true, error: null, data: [] });

    this.apiService.execute('kindOfBooks')
      .subscribe(
        (value: RequestResponse<Kind[]>) => {
          this.kinds.next({
            isLoading: false,
            error: null,
            data: value.successResult
          });
        },
        ({ message, code }: ServerError) => {
          this.kinds.next({ isLoading: false, error: { message, code }, data: [] });
        }
      );
  }

}
