import {Component, Input, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: ProductType;
  @Input() count!: number;
  public inCart: boolean = false;
  public randomPicture: number = 0;

  ngOnInit(): void {
    this.randomPicture = Math.floor((Math.random()) * (10 - 1 + 1)) + 1;
  }

  public addToCart(product: string): void {
    this.inCart = !this.inCart;
    console.log('Added to cart: ' + product);
  }

  public removeFromCart(product: string): void {
    this.inCart = !this.inCart;
    console.log('Removed from cart: ' + product);
  }
}
