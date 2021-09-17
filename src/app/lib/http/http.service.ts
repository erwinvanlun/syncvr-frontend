import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

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
}
