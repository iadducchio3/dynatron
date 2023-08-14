import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '@dynatron/ui';
import {
  Observable,
  Subscription,
  filter,
  finalize,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { CustomerModel } from '../models/customer.model';
import { CustomerDataService } from '../services/customer-data.service';
import { CustomerFormService } from '../services/customer-form.service';

@Component({
  selector: 'app-dynatron-customer-detail',
  standalone: true,
  imports: [ButtonComponent, CustomerFormComponent, RouterModule],
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
})
export class CustomerDetailComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  private sub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerDataService: CustomerDataService,
    private customerFormService: CustomerFormService
  ) {}

  public ngOnInit(): void {
    this.createForm();
    this.sub = this.loadCustomer().subscribe();
  }

  public ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  public onSaveClick(): void {
    this.customerDataService
      .saveCustomer(this.form.getRawValue())
      .pipe(finalize(() => this.router.navigate(['../'])))
      .subscribe();
  }

  private loadCustomer = (): Observable<any> =>
    this.getCustomerId().pipe(
      filter((id) => !!id),
      switchMap((id) => this.getCustomerById(id)),
      tap((cust) => this.form.patchValue(cust))
    );

  private getCustomerId = (): Observable<string> =>
    this.route.params.pipe(map((params) => params['id']));

  private getCustomerById = (id: string): Observable<CustomerModel> =>
    this.customerDataService.getCustomerById(id);

  private createForm(): void {
    this.form = this.customerFormService.createForm();
  }
}
