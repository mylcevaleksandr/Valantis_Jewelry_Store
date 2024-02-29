import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GetIdType} from "../../../types/getId.type";
import {HeaderType} from "../../../types/header.type";
import {IdResponseType} from "../../../types/idResponse.type";
import {GetItemsType} from "../../../types/getItems.type";
import {ItemResponseType} from "../../../types/itemResponse.type";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  public getAllIds(body: GetIdType, headers: HeaderType) {
    return this.http.post<IdResponseType>('https://api.valantis.store:41000/', body, {headers});
  }

  public getItems(body: GetItemsType, headers: HeaderType) {
    return this.http.post<ItemResponseType>('https://api.valantis.store:41000/', body, {headers});
  }
}
