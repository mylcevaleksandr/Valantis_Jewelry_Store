import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../services/product.service";
import {EncryptionUtil} from "../../utils/encryption.util";
import {GetFieldsType} from "../../../../types/getFields.type";
import {catchError, retry} from "rxjs";
import {ProcessErrorUtil} from "../../utils/processError.util";
import {LoaderService} from "../../services/loader.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public searchField = new FormControl();
  public showSearch: boolean = false;
  public products: ProductType[] = [];
  public brandFields: string[] = [];
  public priceFields: number[] = [];
  @Input() categories: string[] = [];

  constructor(private productService: ProductService, private loaderService: LoaderService, private router: Router) {
  }

  public getFieldFilters(field: string): void {
    this.loaderService.show();
    const body: GetFieldsType = {
      "action": "get_fields",
      "params": {"field": field}
    };
    this.productService.getFieldFilters(body, EncryptionUtil.authHeader()).pipe(catchError(ProcessErrorUtil.handleError), retry(3)).subscribe(data => {
      switch (field) {
        case "brand":
          this.brandFields = Array.from(new Set(data.result.filter(Boolean)));
          console.log(this.brandFields);
          this.showSearch = true;
          break;
        case "price":
          this.priceFields = Array.from(new Set(data.result)).map(i => Number(i));
          console.log(this.priceFields);
          break;
      }
      this.loaderService.hide();
    });
  }

  public changeShowedSearch(value: boolean) {
    setTimeout(() => {
      this.showSearch = value;
    }, 300);
  }

  public selectProduct(field: string) {
    console.log(field);
    this.router.navigate(
      ['/catalog'], {
        queryParams: {filterCatalog: field}
      }
    );
  }
}
