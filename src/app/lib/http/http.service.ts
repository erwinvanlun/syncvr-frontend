import {HttpClient, HttpContext, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private httpClient: HttpClient,
  ) {
  }

  get$<T>(url: string, options?: any): Observable<any> { // don't like the any
    return this.httpClient.get(url, options );
  }

  post$<T>(url: string, body: any, options?: any, ): Observable<any> { // don't like the any
    return this.httpClient.post(url, body, options );
  }
}
