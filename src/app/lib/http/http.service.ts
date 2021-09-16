import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpMethod} from "@lib/http/http-methods.enum";

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private httpClient: HttpClient,
  ) {
  }

  get$<T>(url: string, options?: any): Observable<any> { // don't like the any
    console.log('getting on: ' + url);
    return this.httpClient.get(url, options );
  }
}
