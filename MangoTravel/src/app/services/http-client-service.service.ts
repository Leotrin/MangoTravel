/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-var */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class HttpApiClientService {
  private API_ENDPOINTBASE: string;
  private API_ENDPOINT: string;
  currentRoute: String = '';
  hasLoadingController = false;

  constructor(
    private http: HttpClient,

    private navCtrl: NavController,
    private router: Router
  ) {
    this.API_ENDPOINTBASE = environment.baseLink;
    this.API_ENDPOINT = environment.apiLink;
  }

  private setHeaders(
    inHeaders: HttpHeaders,
    isFileUpload = false,
    isWithSocketId = true
  ) {
    var headers = new HttpHeaders();

    // headers = headers.set('Content-Type','multipart/form-data')
    headers = headers.set('Access-Control-Allow-Origin', '*');

    headers = headers.set(
      'Access-Control-Allow-Methods',
      'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    );

    return headers;
  }

  private setParams(params: any = {}) {
    let httpParams = new HttpParams();
    for (const key in params) {
      if (params.hasOwnProperty(key) && params[key] != null) {
        httpParams = httpParams.append(key, params[key]);
      }
    }
    return httpParams;
  }

  get<T>(
    url: string,
    showLoader = false,
    isWithoutRole = false,
    isAddOns: boolean = false,
    xheaders?: HttpHeaders
  ): Observable<any> {
    if (showLoader) {
    }

    let apiUrl = `${this.API_ENDPOINT}/${url}`;

    return this.http
      .get<any>(apiUrl, {
        params: this.setParams({}),
        headers: this.setHeaders(xheaders!),
      })
      .pipe(
        catchError((err) => {
          console.log('tmpErr', err.status);

          return throwError(err);
        }),
        map((response) => {
          if (showLoader) {
          }

          return response;
        })
      );
  }
  delete<T>(
    url: string,
    showLoader = false,
    isWithoutRole = false,
    isAddOns: boolean = false,
    xheaders?: HttpHeaders
  ): Observable<any> {
    let apiUrl = `${this.API_ENDPOINT}/${url}`;

    return this.http
      .delete<any>(apiUrl, {
        params: this.setParams({}),
        headers: this.setHeaders(xheaders!),
      })
      .pipe(
        map((response) => {
          this.hasLoadingController = false;

          return response;
        }),
        catchError((err) => {
          console.log(err);

          return throwError(err);
        })
      );
  }

  post<T>(
    url: string,
    params: object = {},
    showLoader = false,
    isWithoutRole = false,
    isAddOns: boolean = false
  ): Observable<any> {
    let apiUrl = `${this.API_ENDPOINT}/${url}`;

    const headers = new HttpHeaders();
    return this.http
      .post<any>(apiUrl, params, {
        params: this.setParams({}),
        headers: this.setHeaders(headers, true),
      })
      .pipe(
        catchError((err) => {
          return throwError(err);
        }),
        map((response) => {
          return response;
          //return status if data is null but status is true
        })
      );
  }

  patch<T>(
    url: string,
    params: object = {},
    showLoader = true,
    isWithoutRole = false,
    isAddOns: boolean = false
  ): Observable<any> {
    let apiUrl = `${this.API_ENDPOINT}/${url}`;

    const headers = new HttpHeaders();
    return this.http
      .patch<any>(apiUrl, params, {
        params: this.setParams({}),
        headers: this.setHeaders(headers, true),
      })
      .pipe(
        catchError((err) => {
          return throwError(err);
        }),
        map((response) => {
          return response;
          //return status if data is null but status is true
        })
      );
  }

  put<T>(
    url: string,
    params: {},
    showLoader = true,

    xheaders?: HttpHeaders
  ): Observable<any> {
    let apiUrl = `${this.API_ENDPOINT}/${url}`;

    return this.http
      .put<any>(apiUrl, params, {
        params: this.setParams({}),
        headers: this.setHeaders(xheaders!),
      })
      .pipe(
        catchError((err) => {
          console.log(err);

          return throwError(err);
        }),
        map((response) => {
          return response;
          //return status if data is null but status is true
        })
      );
  }
}
