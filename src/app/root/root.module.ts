import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {SvLibModule} from "@lib/lib.module";
import {RootComponent} from "./components/root.component";
import {HttpClient} from "@angular/common/http";
import {LocalisationModule} from "@lib/localisation/localisation.module";

import {RootRoutingModule} from "./root-routing.module";
import {HttpLoaderFactory} from "@lib/localisation/utils.utis";
import {FibonacciModule} from "@fibonacci/fibonacci.module";
import {LocalisationLanguages} from "@lib/localisation/localisation-language.enum";

@NgModule({
  declarations: [
    RootComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
      RootRoutingModule,
      FibonacciModule,

      LocalisationModule.forRoot({ locale_id: LocalisationLanguages.English }),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
      SvLibModule
    ],
  providers: [TranslateService],
  bootstrap: [RootComponent]
})
export class RootModule { }
