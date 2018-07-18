import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[appEightteenOrOlder]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: EightteenOrOlderDirective, multi: true }
  ]
})
export class EightteenOrOlderDirective {

  private youngestDate:Date;//youngest date for someone to be 18 years old
  private checkDate:Date;

  constructor() { }

  validate(c: FormControl): ValidationErrors | null {
    if(c.value == null)
    {
      return {age:'Invalid Age'};
    }

    this.youngestDate = new Date();
    this.youngestDate.setFullYear(this.youngestDate.getFullYear()-18);

    this.checkDate = new Date(c.value);
    if(this.checkDate > this.youngestDate){
      return {age : 'Must be 18 years old or older'};
    }
    return null;
  }
}
