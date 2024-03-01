import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ProductService} from "../../shared/services/product.service";
import {GetIdType} from "../../../types/getId.type";
import {EncryptionUtil} from "../../shared/utils/encryption.util";
import {catchError, retry, throwError} from "rxjs";
import {IdResponseType} from "../../../types/idResponse.type";
import {GetItemsType} from "../../../types/getItems.type";
import {ItemResponseType} from "../../../types/itemResponse.type";
import {ProductType} from "../../../types/product.type";
import {LoaderService} from "../../shared/services/loader.service";
import {ActivatedRoute} from "@angular/router";
import {GetItemsFilterType} from "../../../types/getItemsFilter.type";
import {ProcessErrorUtil} from "../../shared/utils/processError.util";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  private idArray: string[] = [];
  public products: ProductType[] = [];
  public catalogCodes: number[] = [];
  public current: number = 1;
  public perPage: number = 50;
  public total: number = 0;
  public itemsToDisplay: string[] = [];

  constructor(private productService: ProductService, private loaderService: LoaderService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
    });
    this.loaderService.show();
    this.getIds();
  }

  //Get all product ids from backend and after sorting out repeating ids, save them to this.idArray
  private getIds(): void {
    const body: GetIdType = {
      "action": "get_ids",
    };
    this.productService.getAllIds(body, EncryptionUtil.authHeader()).pipe(catchError(ProcessErrorUtil.handleError), retry(3)).subscribe((data: IdResponseType): void => {
      this.idArray = Array.from(new Set(data.result));
      this.total = Math.ceil(this.idArray.length / this.perPage);
      this.itemsToDisplay = this.paginate(this.current, this.perPage);
      this.showProducts(this.itemsToDisplay);
    });
  }

  //Add products to show to this.products array.
  private showProducts(itemsToDisplay: string[]): void {
    this.products = [];
    this.generateProductCodes(this.current, this.perPage);
    const body: GetItemsType = {
      "action": "get_items",
      params: {"ids": itemsToDisplay}
    };
    this.productService.getItems(body, EncryptionUtil.authHeader()).pipe(catchError(ProcessErrorUtil.handleError), retry(3)).subscribe((data: ItemResponseType): void => {
      if (data.result.length > 50) {
        this.getUniqueProducts(data.result);
      } else {
        this.products = data.result;
        this.loaderService.hide();
      }
    });
  }

  private showProductsWithFilter(field: string, filter: string): void {
    this.products = [];
    this.generateProductCodes(this.current, this.perPage);
    const body: GetItemsFilterType = {
      "action": "filter",
      params: {[field as keyof GetItemsFilterType]: filter}
    };
    this.productService.getItemsWithFilter(body, EncryptionUtil.authHeader()).pipe(catchError(ProcessErrorUtil.handleError), retry(3)).subscribe((data: ItemResponseType): void => {
      if (data.result.length > 50) {
        this.getUniqueProducts(data.result);
      } else {
        this.products = data.result;
        this.loaderService.hide();
      }
    });
  }

  //Filter data from backend and return only products with unique ids.
  private getUniqueProducts(data: ProductType[]): void {
    let uniqueProducts: Set<string> = new Set();
    const list: ProductType[] = [...new Set(data.filter((item: ProductType): ProductType | boolean => {
      if (!uniqueProducts.has(item.id)) {
        uniqueProducts.add(item.id);
        return item;
      }
      return false;
    }))];
    this.products = list;
    this.loaderService.hide();
  }

  //Pagination button actions
  public onNext(page: number): void {
    this.current = page + 1;
    this.itemsToDisplay = this.paginate(this.current, this.perPage);
    this.loaderService.show();
    this.showProducts(this.itemsToDisplay);
  }

  public onPrevious(page: number): void {
    this.current = page - 1;
    this.itemsToDisplay = this.paginate(this.current, this.perPage);
    this.loaderService.show();
    this.showProducts(this.itemsToDisplay);
  }

  public onGoTo(page: number): void {
    this.current = page;
    this.itemsToDisplay = this.paginate(this.current, this.perPage);
    this.loaderService.show();
    this.showProducts(this.itemsToDisplay);
  }

  //Add a number to each product card on screen
  private generateProductCodes(current: number, perPage: number): void {
    let arrayOfCodes: number[] = [], length: number = perPage, start: number = (current - 1) * perPage + 1;
    while (length--) arrayOfCodes[length] = length + start;
    this.catalogCodes = arrayOfCodes;
  }

  //Return ids of products which should be displayed on current page
  public paginate(current: number, perPage: number): string[] {
    return [...this.idArray.slice((current - 1) * perPage).slice(0, perPage)];
  }

//Handle errors in response
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
