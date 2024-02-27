import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../../shared/services/product.service";
import {GetIdType} from "../../../types/getId.type";
import {EncryptionUtil} from "../../shared/utils/encryption.util";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  private postResult: any = null;

  constructor(private http: HttpClient, private productService: ProductService) {
  }

  ngOnInit() {
    this.catalog();
  }

  catalog() {
    const body: GetIdType = {
      "action": "get_ids",
    };
    this.productService.getAllIds(body, EncryptionUtil.authHeader()).subscribe(data => {
      this.postResult = data.result;
      this.post();
    });

  }

  post() {
    console.log(this.postResult);
  }

}
