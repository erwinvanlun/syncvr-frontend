import {Component, OnInit} from '@angular/core';
import {ErrorCodes} from "syncvr";
import { FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'sv-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit{
  title = 'Sync VR Fibonacci';

  fibonacciForm = new FormGroup({
    fibonacciInput: new FormControl({value:'' , disabled: false}, [
      Validators.required,
      Validators.min(0),
      Validators.pattern(/^-?(0|[1-9]\d*)?$/)
    ])});

  ngOnInit() {
    console.log(ErrorCodes.FibonacciNonInteger);
  }

  handleSubmit() {
    const values = this.fibonacciForm.value;
    console.log('values:');
    console.log(values);
    console.log(typeof values);

    // const signUpData: ApiSignup =
    //   {
    //     firstName: values.firstName,
    //     lastName: values.lastName,
    //     email: values.email
    //   };
    //
    // this.fibonacciService.signUp$(signUpData).subscribe(
    //   () => {
    //     this.routerService.navigate(['auth/signup/success']);
    //   },
    //   error => {
    //     console.log('foute boel');
    //     console.log(error);
    //   }
    // );
  }

  cancel() {
    this.fibonacciForm.reset();
  }
}
