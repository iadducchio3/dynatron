import { Routes } from '@angular/router';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerListComponent } from './customer-list/customer-list.component';

export const customerRoutes: Routes = [
  { path: '', component: CustomerListComponent },
  { path: 'add', component: CustomerDetailComponent },
  { path: ':id', component: CustomerDetailComponent },
];
