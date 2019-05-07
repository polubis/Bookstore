import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

const url = environment.api;

type RequestTypes = 'get' | 'post' | 'put' | 'patch' | 'delete';

type AccountEndpoints = 'accounts/login' | 'accounts/register';
type AddressEndpoints = 'addresses/add' | 'addresses/';
type BooksEndpoints = 'books';

type Endpoints = AccountEndpoints | AddressEndpoints | BooksEndpoints;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
  }

  requestTypesMap = {
    get: (path, payload) => this.http.get(path, payload),
    post: (path, payload) => this.http.post(path, payload),
    put: (path, payload) => this.http.put(path, payload),
    patch: (path, payload) => this.http.patch(path, payload),
    delete: (path, payload) => this.http.delete(path, payload)
  };

  statusesResponsesMap = {
    0: 'Brak internetu',
    401: 'Brak dostępu',
    500: 'Ups, coś poszło nie tak'
  };

  snackBarBlackList = ['books'];

  extractErrorMessage = (err: HttpErrorResponse): string => this.statusesResponsesMap[err.status] || err.error.errors[0];

  execute = (restUrl: Endpoints, type: RequestTypes = 'get', payload?: any, params = ''): Observable<any> => {
    const path = url + restUrl + params;
    const req: Observable<any> = this.requestTypesMap[type](path, payload);

    return req.pipe(
      catchError((err: HttpErrorResponse) => {
        const useSnackbar = this.snackBarBlackList.find(item => item === restUrl) === null;
        const message = this.extractErrorMessage(err);

        if (useSnackbar) {
          this.snackBar.open(message, 'CLOSE', {
            duration: 5000,
            panelClass: ['warn-snackbar']
          });
        }

        throw { message, code: err.status };
      })
    );
  }
}
