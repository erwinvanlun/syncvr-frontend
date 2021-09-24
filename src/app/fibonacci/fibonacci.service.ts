import {Injectable} from "@angular/core";
import {combineLatest, interval, merge, Observable, Subject, timer} from "rxjs";
import {httpOptions, HttpService} from "@lib/http/http.service";
import {environment} from "../../environments/environment";
import {map, retry, share, switchMap, take, takeUntil, tap} from "rxjs/operators";
// @ts-ignore: todo to check: typescript says that APIFibonacci is not exported but actually it is
import {
  APIFibonacci, APIFibonacciHistoryRequest,
  APIFibonacciHistoryResponse,
  APIFibonacciNumberMeta,
  APIFibonacciNumberRequestResponse
} from "syncvr";
import {HttpHeaders} from "@angular/common/http";

export interface ServiceFibonacciHistory extends APIFibonacciNumberMeta {
  myRequest: boolean;
  new: boolean;
}

@Injectable({
  providedIn: 'root', // moet dit echt?
})
export class FibonacciService {

  history: ServiceFibonacciHistory[] = [];
  head = 0;
  tail = 0;

  myRequests: number[] = [];

  private _polling = new Subject();
  private _forceHistory = new Subject();

  public stopPolling() {
    this._polling.next();
  }

  constructor(private httpService: HttpService) {
  }

  public loadFibonacci$(number: number): Observable<number> {
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

  public loadHistory$(): Observable<ServiceFibonacciHistory[]> {
    const url = environment.fibonacciApi + '/' + APIFibonacci.history;
    console.log('now loading with head ' + this.head + ' tail: ' + this.tail + 'en rows: ' + environment.maxRows);
    let request: APIFibonacciHistoryRequest = {head: this.head, tail: this.tail, maxTailingRows: environment.maxRows}
    return merge(this._forceHistory, timer(1, environment.historyRefreshInSeconds * 1000)).pipe(
      // todo actually historyRefreshInSeconds is more config than environment
      map(() => {
        // is map the best way to make sure head and tail are updated in next loops?
        request = {head: this.head, tail: this.tail, maxTailingRows: environment.maxRows}
      }),
      switchMap(() =>
        this.httpService.post$<APIFibonacciHistoryResponse>(url, request, httpOptions) // todo: we actually need to check whether previous get is finished
          .pipe(
            map((response: APIFibonacciHistoryResponse) => {
              let receivedHistory: ServiceFibonacciHistory[];
              console.log('comparing to');
              console.log(this.head);
              console.log('receivedHistory lenghth');
              console.log(response.history.length);
              receivedHistory = response.history.map((hr) => ({
                ...hr,
                myRequest: this.myRequests.includes(hr.requestId),
                new: hr.requestId > this.head
              }));

              // merge received with current, filter for duplicates
              let ids = new Set(this.history.map(r => r.requestId));
              this.history = [...this.history, ...receivedHistory.filter(r => !ids.has(r.requestId))].
              sort((r1, r2) => r2.requestId - r1.requestId);

              this.head = (this.history.map((r) => r.requestId))
                .reduce((r1, r2) => Math.max(r1, r2));
              console.log('setted head to: ');
              console.log(this.head);

              this.tail = (this.history.map((r) => r.requestId))
                .reduce((r1, r2) => Math.min(r1, r2));
              console.log('setted tail to: ');
              console.log(this.tail);

              return this.history;
            }))),
      //retry(), // retry on failure
      share(), // share this between all subscribers
      takeUntil(this._polling)  // until service is stopped
    );

    // based on https://blog.angulartraining.com/how-to-do-polling-with-rxjs-and-angular-50d635574965

  }


}
