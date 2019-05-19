import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './ApiService';
import { RequestResponse } from '../models/others/RequestResponse';
import { DataEnhancer } from '../models/others/DataEnhancer';
import { ServerError } from '../models/others/ServerError';
import { Kind } from '../models/entities/Kind';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KindsService {

  kinds = new BehaviorSubject<DataEnhancer<Kind[]>>({ isLoading: true, data: [] });

  constructor(private apiService: ApiService) {

  }

  getKinds() {
    this.kinds.pipe(take(1))
      .subscribe(kinds => {
        if (kinds.data.length === 0) {
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
      });
  }

  addKind(kindOfBookPayload: { name: string }) {
    return this.apiService.execute('kindOfBooks/add', 'post', kindOfBookPayload);
  }

  editKind({ name, id }: { name: string, id: number }) {
    return this.apiService.execute('kindOfBooks', 'patch', { name }, `/${id}`);
  }

  putKindInKinds(kind: Kind) {
    this.kinds.pipe(take(1))
      .subscribe(kinds => {
        this.kinds.next(
          { ...kinds, data: [kind, ...kinds.data] }
        );
      });
  }

}
