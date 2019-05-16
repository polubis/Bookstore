import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { ServerError } from '../models/others/ServerError';

const url = environment.api;

type RequestTypes = 'get' | 'post' | 'put' | 'patch' | 'delete';

type AuthEndpoint = 'accounts/login' | 'accounts/register' | 'accounts/logout';
type AddressEndpoints = 'addresses/add' | 'addresses/';
type BooksEndpoints = 'books' | 'books/bestrating' | 'books/newest' | 'books/add';
type KindsEndpoints = 'kindOfBooks';
type OrdersEndpoints = 'orders/submitOrder' | 'orders/getOrders';
type AccountsEndpoints = 'accounts/updateUserData' | 'accounts/getUserData';

type Endpoints = AuthEndpoint | AddressEndpoints | BooksEndpoints | KindsEndpoints | OrdersEndpoints | AccountsEndpoints;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
  }

  requestTypesMap = {
    get: (path, payload) => this.http.get(path, { withCredentials: true }),
    post: (path, payload) => this.http.post(path, payload, { withCredentials: true }),
    put: (path, payload) => this.http.put(path, payload, { withCredentials: true }),
    patch: (path, payload) => this.http.patch(path, payload, { withCredentials: true }),
    delete: (path, payload) => this.http.delete(path, { withCredentials: true })
  };

  statusesResponsesMap = {
    0: 'Brak internetu',
    401: 'Brak dostępu',
    405: 'Problem z ciałem zapytania',
    500: 'Ups, coś poszło nie tak',
  };

  snackBarBlackList = ['books/newest', 'books/bestrating'];

  extractErrorMessage = (err: HttpErrorResponse): string => {
    if (this.statusesResponsesMap.hasOwnProperty(err.status)) {
      return this.statusesResponsesMap[err.status];
    }
    const { errors }: any = err.error;
    if (Array.isArray(errors)) {
      return errors[0];
    } else {
      const errorKeys = Object.keys(errors);
      const firstErrorGroup: string[] = errors[errorKeys[0]];
      return firstErrorGroup[0];
    }
  }

  execute = (restUrl: Endpoints, type: RequestTypes = 'get', payload?: any, params = ''): Observable<any> => {
    const path = url + restUrl + params;
    const req: Observable<any> = this.requestTypesMap[type](path, payload);

    return req.pipe(
      catchError((err: HttpErrorResponse) => {
        const useSnackbar = this.snackBarBlackList.find(item => item === restUrl) === undefined;
        const message = this.extractErrorMessage(err);
        if (useSnackbar) {
          this.snackBar.open(message, 'CLOSE', {
            duration: 5000,
            panelClass: ['warn-snackbar']
          });
        }

        throw { message, code: err.status } as ServerError;
      })
    );
  }
}
