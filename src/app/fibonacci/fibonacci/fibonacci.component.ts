import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SvControlOptions} from "@lib/forms/controls/control-options.interface";
import {FibonacciService, ServiceFibonacciHistory} from "@fibonacci/fibonacci.service";
import { Subscription} from "rxjs";

@Component({
  selector: 'sv-fibonacci',
  templateUrl: './fibonacci.component.html',
  styleUrls: ['./fibonacci.component.scss']
})
export class FibonacciComponent implements OnInit, OnDestroy {

  options: SvControlOptions = {
    dataCy: "",
    label: "base number",
    name: "number"
  }

  result: string = '';
  error: string = '';
  history: ServiceFibonacciHistory[] = [];
  historySubscription = new Subscription();

  displayedColumns: string[] = ['requestId', 'number', 'fibonacci', 'timestamp', 'ipAddress'];

  constructor(private fibonacciService: FibonacciService) { }

  ngOnInit() {
    this.historySubscription = this.fibonacciService
      .getHistory$()
      .subscribe(
        (h) => {
          this.history = h;
        },
        error => {
          this.error = error;
        });
  }

  ngOnDestroy() {
    this.historySubscription.unsubscribe();
    this.fibonacciService.stopPolling(); // not sure whether this is truely necessary.
  }

  fibonacciForm = new FormGroup({
    fibonacciInput: new FormControl({value:'' , disabled: false}, [
      Validators.required,
      Validators.min(0),
      Validators.pattern(/^-?(0|[1-9]\d*)?$/)
    ])});

  handleCalcFibonacci() {
    const value = this.fibonacciForm.value;
    this.fibonacciService
      .getFibonacci$(value.number)
      .subscribe(
        (r) => {
          this.result = r.toString();
        },
        // todo better typed error handling here. If Backend not available at all, should be set as error message in FE
        error => {
          this.error = 'something went wrong';
          console.log('error!');
          console.log(error.status);
        },
      );
  }
}
