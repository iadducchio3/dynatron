import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dynatron-left-nav',
  standalone: true,
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftNavComponent {}
