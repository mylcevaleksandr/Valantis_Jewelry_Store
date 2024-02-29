import {Component, Input} from '@angular/core';
import {ProductType} from "../../../../types/product.type";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: ProductType;
  @Input() count!: number;


  public addToCart(): void {
    console.log('added to cart');
  }
}
