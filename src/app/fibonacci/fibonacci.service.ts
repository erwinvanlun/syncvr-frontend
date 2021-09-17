import {Injectable} from "@angular/core";
import {combineLatest, interval, merge, Observable, Subject, timer} from "rxjs";
import {HttpService} from "@lib/http/http.service";
import {environment} from "../../environments/environment";
import {map, retry, share, switchMap, take, takeUntil, tap} from "rxjs/operators";
// @ts-ignore: todo to check: typescript says that APIFibonacci is not exported but actually it is
import {
  APIFibonacci,
  APIFibonacciHistoryResponse,
  APIFibonacciNumberMeta,
  APIFibonacciNumberRequestResponse
} from "syncvr";

export interface ServiceFibonacciHistory extends APIFibonacciNumberMeta {
  myRequest: boolean;
  new: boolean;
}

@Injectable({
  providedIn: 'root', // moet dit echt?
})
export class FibonacciService {

  oldest = 0;
  newest = 0;
  myRequests: number[] = [];

  private _polling = new Subject();
  private _forceHistory = new Subject();

  public stopPolling() {
    this._polling.next();
  }

  constructor(private httpService: HttpService) {
  }

  public getFibonacci$(number: number): Observable<number> {
    const url = environment.fibonacciApi + '/' + number.toString();
    return this.httpService.get$(url).pipe(
      take(1),
      tap(response => {
        this.myRequests.push(response.result.requestId);
        this._forceHistory.next();
      }),
      map((response: APIFibonacciNumberRequestResponse) => response.result.fibonacci)
    )
  }

  public getHistory$(): Observable<ServiceFibonacciHistory[]> {
    const url = environment.fibonacciApi + '/' + APIFibonacci.history;
    return merge(this._forceHistory, timer(1, environment.historyRefreshInSeconds * 1000)).pipe(
      // todo actually historyRefreshInSeconds is more config than environment
      switchMap(() =>
        this.httpService.get$(url) // todo: we actually need to check whether previous get is finished
          .pipe(
            map((response: APIFibonacciHistoryResponse) => {
              let serviceHistory: ServiceFibonacciHistory[];
              serviceHistory = response.history.map((hr) => ({
                ...hr,
                myRequest: this.myRequests.includes(hr.requestId),
                new: false
              }));
              return serviceHistory;
            }))),
      retry(), // retry on failure
      share(), // share this between all subscribers
      takeUntil(this._polling)  // until service is stopped
    );

    // based on https://blog.angulartraining.com/how-to-do-polling-with-rxjs-and-angular-50d635574965

  }




}
