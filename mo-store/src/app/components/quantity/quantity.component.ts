import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-quantity',
  templateUrl: 'quantity.component.html',
  styleUrls: ['quantity.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class QuantityComponent {
  /*
   * ✅ This implementation of Two-way binding
   */

  // { required: true } is a feature of Angular v16. By default it's false
  @Input({ required: true }) quantity = 1;
  @Output() quantityChange = new EventEmitter<number>();
  @Input() label = true;
  @Input() start = 1;

  /**
   * To make it work:
   *  Output event name must be (Input name + 'Change' word). for example here we have
   *  Input 'quantity' the Output must be input(quantity) + 'Change' => quantityChange
   *
   *  More on Angular docs: https://angular.io/guide/two-way-binding
   */

  changeQuantity(changeby: 1 | -1) {
    // Prevent minus values and values grater than 100
    if (
      (this.quantity === this.start && changeby === -1) ||
      (this.quantity === 100 && changeby === 1)
    )
      return;

    this.quantity += changeby;
    this.quantityChange.emit(this.quantity);
  }
}
