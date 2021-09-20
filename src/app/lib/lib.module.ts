import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {TextInputComponent} from "./forms/controls/text-input/text-input.component";
import {RelativeTimeNumPipe, RelativeTimeTextPipe} from "@lib/pipes/relative-time";

@NgModule({
  declarations: [
    TextInputComponent,
    RelativeTimeNumPipe,
    RelativeTimeTextPipe
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    TranslateModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    TextInputComponent,
    RelativeTimeNumPipe,
    RelativeTimeTextPipe
  ]

})
export class SvLibModule { }


