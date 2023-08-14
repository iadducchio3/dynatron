import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  public value!: string | null;
  @Input() label!: string;

  public onChange!: (value: string | null) => void;

  public onTouched!: () => void;

  public registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  public writeValue(value: string | null): void {
    this.value = value;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public onInputChange(e: Event): void {
    this.onChange((e.target as HTMLInputElement).value);
  }
}
