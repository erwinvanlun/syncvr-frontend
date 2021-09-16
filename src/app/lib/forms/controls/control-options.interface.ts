import { AbstractControlOptions, ValidatorFn } from '@angular/forms';

export interface SvValidator {
  validator: ValidatorFn;
}
export interface SvControlOptions extends  Omit<AbstractControlOptions, 'validators'>{
  name: string;
  label: string;
  hint?: string;
  value?: string;
  validation?: {
    validators: SvValidator [];
    minCharsForValidate?: number;
  };  // overwrite, only allow array
  dataCy: string;
}
