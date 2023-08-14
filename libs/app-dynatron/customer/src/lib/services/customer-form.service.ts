import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class CustomerFormService {
  public createForm = (): FormGroup =>
    new FormGroup({
      FirstName: new FormControl<string | null>(null),
      LastName: new FormControl<string | null>(null),
      Email: new FormControl<string | null>(null, {
        validators: [Validators.email],
      }),
      Id: new FormControl<string | null>(null),
      UpdatedOn: new FormControl<Date | null>(null),
      InsertedOn: new FormControl<Date | null>(null),
    });
}
