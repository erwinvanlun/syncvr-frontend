import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SvControlOptions} from "@lib/forms/controls/control-options.interface";
import {FibonacciService} from "@fibonacci/fibonacci.service";
import { Subscription} from "rxjs";
import {APIFibonacciNumberMeta} from "syncvr";

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
  history: APIFibonacciNumberMeta[] = [];
  historySubcription = new Subscription();

  displayedColumns: string[] = ['requestId', 'number', 'fibonacci', 'timestamp', 'ipAddress'];

  constructor(private fibonacciService: FibonacciService) { }

  ngOnInit() {
    this.historySubcription = this.fibonacciService
      .getHistory$()
      .subscribe(
        (h) => {
          console.log('history is binnen!');
          console.log(h);
          this.history = h;
        },
        error => {
          this.error = error;
        })
  }

  ngOnDestroy() {
    this.historySubcription.unsubscribe();
    this.fibonacciService.stopPolling(); // not sure whether this is truely necessary.
  }

  fibonacciForm = new FormGroup({
    fibonacciInput: new FormControl({value:'' , disabled: false}, [
      Validators.required,
      Validators.min(0),
      Validators.pattern(/^-?(0|[1-9]\d*)?$/)
    ])});

  handleGetResult() {
    const value = this.fibonacciForm.value;
    this.fibonacciService
      .getFibonacci$(value.number)
      .subscribe(
        (r) => {
          console.log('result:');
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
