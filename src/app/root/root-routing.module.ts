import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FibonacciComponent} from "@fibonacci/fibonacci/fibonacci.component";

//
//  { path: 'fibonacci', loadChildren:  () => import('@fibonacci/fibonacci.module').then(m => m.FibonacciModule)},

const routes: Routes = [
  { path: 'fibonacci', component: FibonacciComponent },
{ path: '',   redirectTo: '/fibonacci', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,   {anchorScrolling:  'enabled'})],
  exports: [RouterModule]
})
export class RootRoutingModule { }
