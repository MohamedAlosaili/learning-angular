import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.css'],
})
export class ButtonComponent {
  @Input() className: string = '';
  @Input() styles: string = '';
  @Input() alt = false;
}
