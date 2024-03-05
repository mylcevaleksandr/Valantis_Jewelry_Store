import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {EncryptionUtil} from "../utils/encryption.util";
import {catchError, retry} from "rxjs";
import {ProcessErrorUtil} from "../utils/processError.util";
import {GetFieldsType} from "../../../types/getFields.type";
import {FieldsResponseType} from "../../../types/fieldsResponse.type";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public categories: string[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    const body: GetFieldsType = {
      "action": "get_fields"
    };
    this.productService.getAllFields(body, EncryptionUtil.authHeader()).pipe(catchError(ProcessErrorUtil.handleError), retry(3)).subscribe((data:FieldsResponseType):void => {
      this.categories = data.result.filter((item: string):boolean => item !== 'product');
    });
  }
}
