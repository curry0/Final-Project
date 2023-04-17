import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
    selector: 'app-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements ControlValueAccessor {
    @Input() type = 'text';
    @Input() label = '';
    bsConfig: Partial<BsDatepickerConfig> | undefined;

    constructor(@Self() public controlDir: NgControl) {
        this.controlDir.valueAccessor = this;
        this.bsConfig = {
                containerClass: 'theme-red',
                dateInputFormat: 'DD MMMM YYYY'
            }
    }

    writeValue(obj: any): void {
    }
    registerOnChange(fn: any): void {
    }
    registerOnTouched(fn: any): void {
    }

    get control(): FormControl {
        return this.controlDir.control as FormControl
    }

}
