import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {LoaderService} from "../../services/loader.service";
import {Router} from "@angular/router";
import {debounceTime, Subscription} from "rxjs";
import {ChangeSearchService} from "../../services/change-search.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public searchField: FormControl<string> = new FormControl();
  public showSearch: boolean = false;
  @Input() categories: string[] = [];
  private subscription: Subscription | null = null;


  constructor(private productService: ProductService, private loaderService: LoaderService, private searchChange: ChangeSearchService, private router: Router) {
    this.subscription = this.searchChange.watchChanges().subscribe(search => {
      if (!search) {
        this.searchField.setValue('');
      }
    });
  }

  ngOnInit(): void {
    this.searchField.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      if (value && value.length > 1) {
        this.router.navigate(
          ['/catalog'], {
            queryParams: {
              category: 'product',
              filterField: value
            }
          }
        );
      }
    });
  }

  public changeShowedSearch(value: boolean) {
    setTimeout(() => {
      this.showSearch = value;
    }, 300);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
