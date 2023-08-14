import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SessionStorageService } from '@dynatron/core';
import { ButtonComponent } from '@dynatron/ui';
import { Observable, concatMap, tap } from 'rxjs';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { CustomerModel } from '../models/customer.model';
import { Customers } from '../models/customers.type';
import { CustomerDataService } from '../services/customer-data.service';
import { CustomerFormService } from '../services/customer-form.service';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterModule, CustomerFormComponent],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  public customers!: Customers;
  public form: FormGroup = this.customerFormService.createForm();
  public lastChangedId!: string | null;

  constructor(
    private customerDataService: CustomerDataService,
    private customerFormService: CustomerFormService,
    private sessionStorageService: SessionStorageService
  ) {}

  public ngOnInit(): void {
    this.getCustomers().subscribe();
    this.highlightLastChanged().subscribe();
  }

  public onEditClick(customer: CustomerModel): void {
    this.form.patchValue(customer);
  }

  public onSaveClick(): void {
    this.customerDataService
      .saveCustomer(this.form.getRawValue())
      .pipe(
        tap(() => this.form.reset()),
        concatMap(() => this.getCustomers())
      )
      .subscribe();
  }

  private getCustomers = (): Observable<Customers> =>
    this.customerDataService
      .getCustomers()
      .pipe(tap((customers) => (this.customers = customers)));

  private highlightLastChanged = (): Observable<string | null> =>
    this.sessionStorageService
      .get<string>('LastUpdatedCustomer')
      .pipe(tap((id) => (this.lastChangedId = id)));
}
