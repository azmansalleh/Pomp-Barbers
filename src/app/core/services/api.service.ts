// Angular imports
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

// Models imports
import { ParamsObj } from '@models/Http';

// RxJS imports
import { Observable ,  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Environment imports
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  private formatErrors(error: any): any {
      return  throwError(error.error);
  }

  get(path: string, paramList?: ParamsObj[]): Observable<any> {

    let httpParams = new HttpParams();
    if (paramList) {
      paramList.forEach((element) => {
        httpParams = httpParams.append(element.key, element.value);
      });
    }

    return this.http.get(
    `${environment.apiBaseUrl}${path}`,
    { params: httpParams },
    ).pipe(catchError(this.formatErrors));
  }

  put(path: string, body: object = {}): Observable<any> {
      return this.http.put(
        `${environment.apiBaseUrl}${path}`,
        JSON.stringify(body)
      ).pipe(catchError(this.formatErrors));
  }

  post(path: string, paramList?: ParamsObj[], body?: object): Observable<any> {

    let httpParams = new HttpParams();
    if (paramList) {
      paramList.forEach((element) => {
        httpParams = httpParams.append(element.key, element.value);
      });
    }

    return this.http.post(
      `${environment.apiBaseUrl}${path}`,
      JSON.stringify(body),
      {params: httpParams },
      ).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
      return this.http.delete(
        `${environment.apiBaseUrl}${path}`
      ).pipe(catchError(this.formatErrors));
  }
}
