import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  HeaderComponent,
  LeftNavComponent,
} from '@dynatron/app-dynatron/layout';

@Component({
  standalone: true,
  imports: [HeaderComponent, LeftNavComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}
