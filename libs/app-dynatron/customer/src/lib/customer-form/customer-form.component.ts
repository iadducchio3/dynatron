import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '@dynatron/ui';

@Component({
  selector: 'app-dynatron-customer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent],
  templateUrl: './customer-form.component.html',
})
export class CustomerFormComponent {
  @Input() public form!: FormGroup;
}
