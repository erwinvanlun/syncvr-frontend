import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FibonacciComponent} from "@fibonacci/fibonacci/fibonacci.component";

const fibonacciRoutes: Routes = [
  { path: '*', component: FibonacciComponent },
];

@NgModule({
  imports: [RouterModule.forChild(fibonacciRoutes)],
  exports: [RouterModule]
})
export class FibonacciRoutingModule { }

