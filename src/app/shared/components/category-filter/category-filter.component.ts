import {Component, HostListener, Input} from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {LoaderService} from "../../services/loader.service";
import {GetFieldsType} from "../../../../types/getFields.type";
import {EncryptionUtil} from "../../utils/encryption.util";
import {catchError, retry} from "rxjs";
import {ProcessErrorUtil} from "../../utils/processError.util";

@Component({
  selector: 'category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent {
  @Input() category: string | null = null;
  public open: boolean = false;
  public searchFields: string[] = [];
  public activeParam: string = '';

  constructor(private productService: ProductService, private loaderService: LoaderService, private router: Router) {
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event: Event) {
    setTimeout(() => {
      if (this.open) {
        this.toggle();
      }
    }), 300;

  }

  public getFieldFilters(field: string): void {
    if (!this.open) {
      this.loaderService.show();
      const body: GetFieldsType = {
        "action": "get_fields",
        "params": {"field": field}
      };
      this.productService.getFieldFilters(body, EncryptionUtil.authHeader()).pipe(catchError(ProcessErrorUtil.handleError), retry(3)).subscribe(data => {
        switch (field) {
          case "brand":
            this.searchFields = Array.from(new Set(data.result.filter(Boolean))).sort();
            break;
          case "price":
            this.searchFields = Array.from(new Set(data.result)).sort((a, b) => +a - +b);
            break;
        }
        this.loaderService.hide();
        this.toggle();
      });
    } else {
      this.toggle();
    }
  }


  public updateFilterParam(category: string, searchField: string) {
    if (category) {
      this.router.navigate(
        ['/catalog'], {
          queryParams: {
            category: category,
            filterField: searchField
          }
        }
      );
    }
    this.toggle();
  }

  public toggle(): void {
    this.open = !this.open;
  }
}
