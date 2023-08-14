import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['button.component.scss'],
})
export class ButtonComponent {
  @Output() public buttonClick = new EventEmitter<void>();

  @Input() public enabled = true;

  @Input() public text = '';

  public onClick = (): void => this.buttonClick.emit();
}
