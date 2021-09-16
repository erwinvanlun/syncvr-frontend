import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {SvControlOptions} from "../control-options.interface";

@Component({
  selector: 'sv-text-input',
  templateUrl: './text-input.component.html',
  styles: [''],
})
export class TextInputComponent  implements OnInit {
  @Input() formGroupObj!: FormGroup;
  @Input() options!: SvControlOptions;
  private _control!: FormControl;
  readonly = false;

  set control(c: FormControl) {
    this._control = c;
  }

  get control(): FormControl {
    if (!this._control) {
      throw new Error('Can\'t access control, not set yet!');
    }
    return this._control;
  }
  ngOnInit() {
    this.formGroupObj.addControl(
      this.options.name,
      new FormControl(
        this.options.value ? {value:  this.options.value, disabled: false} : null
      )
    );
  }


}


