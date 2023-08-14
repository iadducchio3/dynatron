import { Routes } from '@angular/router';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

export const customerRoutes: Routes = [
  { path: 'add', component: CustomerDetailComponent },
  { path: ':id', component: CustomerDetailComponent },
];
