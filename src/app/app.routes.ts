import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'customers',
    loadChildren: () =>
      import('@dynatron/app-dynatron/customer').then((c) => c.customerRoutes),
  },
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  { path: '**', redirectTo: 'customers', pathMatch: 'full' },
];
