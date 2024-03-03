import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductCardComponent} from './components/product-card/product-card.component';
import {LoaderComponent} from './components/loader/loader.component';
import {PaginationComponent} from './components/pagination/pagination.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CategoryFilterComponent} from './components/category-filter/category-filter.component';

@NgModule({
  declarations: [
    ProductCardComponent,
    LoaderComponent,
    PaginationComponent,
    CategoryFilterComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    ProductCardComponent,
    CategoryFilterComponent,
    LoaderComponent,
    PaginationComponent
  ]
})
export class SharedModule {
}
