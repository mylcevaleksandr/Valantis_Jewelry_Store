import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductCardComponent} from './components/product-card/product-card.component';
import {LoaderComponent} from './components/loader/loader.component';
import {PaginationComponent} from './components/pagination/pagination.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    ProductCardComponent,
    LoaderComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    ProductCardComponent,
    // CategoryFilterComponent,
    LoaderComponent,
    PaginationComponent
  ]
})
export class SharedModule {
}
