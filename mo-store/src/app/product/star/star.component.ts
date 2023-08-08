import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: 'star.component.html',
  styleUrls: ['star.component.css'],
})
export class StarComponent implements AfterViewInit {
  @Input() rate = 0;

  @ViewChild('starsContainer') starsContainer!: ElementRef;

  constructor(private render: Renderer2) {}

  ngAfterViewInit(): void {
    const intRate = Math.floor(this.rate);
    const decimalRate = Number((this.rate - intRate).toFixed(1));

    for (let i = 0; i < 5; i++) {
      const star = this.render.createElement('div');
      const empty = this.render.createElement('span');
      const filled = this.render.createElement('span');

      const emptyStar = this.render.createText('☆');
      const filledStar = this.render.createText('★');

      this.render.addClass(star, 'star');
      this.render.addClass(empty, 'empty');
      this.render.addClass(filled, 'filled');

      this.render.appendChild(empty, emptyStar);
      this.render.appendChild(filled, filledStar);

      this.render.appendChild(star, empty);
      if (i + 1 <= intRate) {
        this.render.appendChild(star, filled);
      } else if (this.rate > i) {
        this.render.appendChild(star, filled);
        this.render.setStyle(filled, 'width', `${decimalRate * 100}%`);
      }

      this.render.appendChild(this.starsContainer.nativeElement, star);
    }
  }
}
