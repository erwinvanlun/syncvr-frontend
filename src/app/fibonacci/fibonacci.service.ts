import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpService} from "@lib/http/http.service";
import {environment} from "../../environments/environment";
import {map, tap} from "rxjs/operators";
import {APIFibonacciHistoryResponse, APIFibonacciNumberMeta, APIFibonacciNumberRequestResponse} from "syncvr";

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

  public getHistory$(): Observable<APIFibonacciNumberMeta[]> {
    const url = environment.fibonacciApi + '/history'; // todo endpoint urls to be centralised in api
    return (this.httpService.get$(url)
      .pipe(
        tap((x) => {console.log(x); console.log('logged')}),
        map((response: APIFibonacciHistoryResponse) => response.history)));
  }


  //     let ReturnValue = of(this.stubResponse);
  //     setInterval(()=>{
  //
  //         console.log(this.stubResponse);
  //         ReturnValue.next();
  //
  //     }, 2000);
  //
}
