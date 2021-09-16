import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpService} from "@lib/http/http.service";
import {environment} from "../../environments/environment";
import { tap} from "rxjs/operators";
import {APIFibonacciHistoryResponse, APIFibonacciNumberRequestResponse} from "syncvr";

@Injectable({
  providedIn: 'root', // moet dit echt?
})
export class FibonacciService {

  oldest = 0;
  newest = 0;

  constructor(private httpService: HttpService) {
  }

  public getFibonacci$(number: number): Observable<APIFibonacciNumberRequestResponse> {
    const url = environment.fibonacciApi + '/' + number.toString();
    return this.httpService.get$(url).pipe(tap(x => console.log(x)));
  // .pipe(map((a: FibonacciNumberResponse) => a.fibonacci))
  }

  public getHistory$(): Observable<APIFibonacciHistoryResponse> {
    const url = environment.fibonacciApi + '/history';

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('before', this.oldest.toString());
    headers.append('after', this.newest.toString())
    return (this.httpService.get$(url, {headers: headers}));
  }
}
