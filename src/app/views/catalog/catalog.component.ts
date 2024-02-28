import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ProductService} from "../../shared/services/product.service";
import {GetIdType} from "../../../types/getId.type";
import {EncryptionUtil} from "../../shared/utils/encryption.util";
import {catchError, retry, throwError} from "rxjs";
import {IdResponseType} from "../../../types/idResponse.type";
import {GetItemsType} from "../../../types/getItems.type";
import {ItemResponseType} from "../../../types/itemResponse.type";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  private idArray: string[] = [];
  private page: number = 1;
  public products: {product:string}[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getIds();
  }

  private getIds(): void {
    const body: GetIdType = {
      "action": "get_ids",
    };
    this.productService.getAllIds(body, EncryptionUtil.authHeader()).pipe(catchError(this.handleError), retry(3)).subscribe((data: IdResponseType): void => {
      this.idArray = Array.from(new Set(data.result));
      this.showProducts();
    });
  }

  private showProducts() {
    const body: GetItemsType = {
      "action": "get_items",
      params: {"ids": this.idArray.slice(0, 50)}
    };
    this.productService.getItems(body, EncryptionUtil.authHeader()).pipe(catchError(this.handleError), retry(3)).subscribe((data: ItemResponseType) => {
      if (data.result.length > 50) {
        this.getItems(data.result);
      } else {
        this.products = data.result;
      }
    });
  }

  private getItems(data: any) {
    let uniqueItems = new Set();
    const list: any = [...new Set(data.filter((item: any) => {
      if (!uniqueItems.has(item.id)) {
        uniqueItems.add(item.id);
        return item;
      }
    }))];
    console.log(list);
    this.products = list;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log('An error occurred:', error.error);
    } else if (error.status === 401) {
      console.log(
        `Backend returned code ${error.status}, body was: `, error.error);
    } else if (error.status === 500) {
      console.log(`Backend returned code ${error.status}, body was: `, error.error);
    } else {
      console.log(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error(`Backend returned code ${error.status}, body was: ` + error.error));
  }
}
