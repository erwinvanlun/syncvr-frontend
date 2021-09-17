import {Injectable} from "@angular/core";
import {interval, Observable, Subject, timer} from "rxjs";
import {HttpService} from "@lib/http/http.service";
import {environment} from "../../environments/environment";
import {map, retry, share, switchMap, takeUntil, tap} from "rxjs/operators";
// @ts-ignore: todo to check: typescript says that APIFibonacci is not exported but actually it is
import {
  APIFibonacci,
  APIFibonacciHistoryResponse,
  APIFibonacciNumberMeta,
  APIFibonacciNumberRequestResponse
} from "syncvr";

@Injectable({
  providedIn: 'root', // moet dit echt?
})
export class FibonacciService {

  oldest = 0;
  newest = 0;

  private _polling = new Subject();
  public stopPolling() {
    this._polling.next();
  }
  constructor(private httpService: HttpService) {
  }

  public getFibonacci$(number: number): Observable<APIFibonacciNumberRequestResponse> {
    const url = environment.fibonacciApi + '/' + number.toString();
    return this.httpService.get$(url).pipe(tap(x => console.log(x)));
  // .pipe(map((a: FibonacciNumberResponse) => a.fibonacci))
  }

  public getHistory$(): Observable<APIFibonacciNumberMeta[]> {
    const url = environment.fibonacciApi + '/' + APIFibonacci.history;
    return timer(1, 3000).pipe(
      switchMap(() =>
      this.httpService.get$(url) // todo: we actually need to check whether previous get is finished
      .pipe(
        map((response: APIFibonacciHistoryResponse) => response.history))),
      retry(), // retry on failure
      share(),
      takeUntil(this._polling)// share this between all subscribers
  );

    // based on https://blog.angulartraining.com/how-to-do-polling-with-rxjs-and-angular-50d635574965
  }
}
