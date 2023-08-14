import { Injectable } from '@angular/core';
import { SessionStorageService } from '@dynatron/core';
import { Observable, delay, finalize, of } from 'rxjs';
import { mockCustomers } from '../mock-customers';
import { CustomerModel } from '../models/customer.model';
import { Customers } from '../models/customers.type';

@Injectable({ providedIn: 'root' })
export class CustomerDataService {
  constructor(private sessionStorageService: SessionStorageService) {}

  public getCustomerById = (id: string): Observable<CustomerModel> =>
    of(
      mockCustomers.find((customer) => customer.Id === id) ?? mockCustomers[0]
    ).pipe(delay(500));

  public saveCustomer(customer: CustomerModel): Observable<CustomerModel> {
    const index = mockCustomers.findIndex((cust) => cust.Id === customer.Id);
    if (index >= 0) mockCustomers[index] = customer;
    else {
      customer = {
        ...customer,
        Id: Date.now().toString(),
        UpdatedOn: new Date().toString(),
        InsertedOn: new Date().toString(),
      };
      mockCustomers.push(customer);
    }
    return this.getCustomerById(customer.Id).pipe(
      finalize(() =>
        this.sessionStorageService.set('LastUpdatedCustomer', customer.Id)
      )
    );
  }

  public getCustomers = (): Observable<Customers> =>
    of(mockCustomers).pipe(delay(500));
}
