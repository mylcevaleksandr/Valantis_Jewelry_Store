import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {LoaderService} from "../../services/loader.service";
import {GetFieldsType} from "../../../../types/getFields.type";
import {EncryptionUtil} from "../../utils/encryption.util";
import {catchError, retry} from "rxjs";
import {ProcessErrorUtil} from "../../utils/processError.util";
import {ChangeSearchService} from "../../services/change-search.service";

@Component({
  selector: 'category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {
  @Input() category: string | null = null;
  public open: boolean = false;
  public searchFields: string[] = [];
  public activeField: string | null = null;

  constructor(private productService: ProductService, private loaderService: LoaderService, private searchChange: ChangeSearchService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['category'] && params['filterField']) {
        this.activeField = params['filterField'];
      } else {
        this.activeField = null;
      }
    });
  }

  // Close dropdown menu on body click
  @HostListener('document:click', ['$event']) onDocumentClick(event: Event): void {
    setTimeout(() => {
      if (this.open) {
        this.toggle();
      }
    }), 300;
  }

  // Open dropdown and get matching field filters sorted alphabetically or from smallest to greatest
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

  // Update query params
  public updateFilterParam(category: string, searchField: string) {
    if (category && searchField) {
      this.searchChange.setFalse();
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

  // Toggle dropdown
  public toggle(): void {
    this.open = !this.open;
  }
}
