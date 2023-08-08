import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit {
  title = 'Page Not Found!';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const isProductPage = JSON.parse(
      this.route.snapshot.queryParams['product']
    );

    if (isProductPage) {
      this.title = 'Product not found';
    }
  }
}
