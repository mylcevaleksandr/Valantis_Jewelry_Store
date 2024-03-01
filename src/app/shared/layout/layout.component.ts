import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {EncryptionUtil} from "../utils/encryption.util";
import {catchError, retry} from "rxjs";
import {ProcessErrorUtil} from "../utils/processError.util";
import {LoaderService} from "../services/loader.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public categories: string[] = [];

  constructor(private productService: ProductService, private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.loaderService.show();
    const body = {
      "action": "get_fields"
    };
    this.productService.getAllFields(body, EncryptionUtil.authHeader()).pipe(catchError(ProcessErrorUtil.handleError), retry(3)).subscribe(data => {
      this.categories = data.result.filter((item: string) => item !== 'product');
      this.loaderService.hide();
    });
  }
}
