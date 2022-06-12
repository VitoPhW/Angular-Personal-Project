import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Component, Input, OnInit, Self } from '@angular/core';

type OptionsArray = {value: string, display: string};

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() categories: OptionsArray[] = [];

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void { }
  registerOnChange(fn: any): void { }
  registerOnTouched(fn: any): void { }

}
