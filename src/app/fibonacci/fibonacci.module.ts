import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FibonacciComponent } from './fibonacci/fibonacci.component';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpLoaderFactory} from "@lib/localisation/utils.utis";
import {HttpClient} from "@angular/common/http";
import {SvLibModule} from "@lib/lib.module";
import {FibonacciRoutingModule} from "@fibonacci/fibonacci-routing.module";
import {FibonacciService} from "@fibonacci/fibonacci.service";
import {MatTableModule} from "@angular/material/table";

@NgModule({
  declarations: [
    FibonacciComponent
  ],
  imports: [
    CommonModule,
    FibonacciRoutingModule,
    SvLibModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
  ],
  providers: [
    FibonacciService
  ]
})
export class FibonacciModule { }
