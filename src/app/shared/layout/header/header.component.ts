import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ProductType} from "../../../../types/product.type";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public searchField = new FormControl();
  public showSearch: boolean = false;
  public products: ProductType[] = [];


  public changeShowedSearch(value: boolean) {

  }

  public selectProduct(productId: string) {

  }
}
