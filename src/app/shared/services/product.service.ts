import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GetIdType} from "../../../types/getId.type";
import {HeaderType} from "../../../types/header.type";
import {IdResponseType} from "../../../types/idResponse.type";
import {GetItemsType} from "../../../types/getItems.type";
import {ItemResponseType} from "../../../types/itemResponse.type";
import {GetFieldsType} from "../../../types/getFields.type";
import {GetIdsFilterType} from "../../../types/getIdsFilterType";
import {FieldsResponseType} from "../../../types/fieldsResponse.type";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  public getAllIds(body: GetIdType | GetIdsFilterType, headers: HeaderType) {
    return this.http.post<IdResponseType>('https://api.valantis.store:41000/', body, {headers});
  }

  public getItems(body: GetItemsType, headers: HeaderType) {
    return this.http.post<ItemResponseType>('https://api.valantis.store:41000/', body, {headers});
  }

  public getAllFields(body: GetFieldsType, headers: HeaderType) {
    return this.http.post<FieldsResponseType>('https://api.valantis.store:41000/', body, {headers});
  }

  public getFieldFilters(body: GetFieldsType, headers: HeaderType) {
    return this.http.post<FieldsResponseType>('https://api.valantis.store:41000/', body, {headers});
  }

}
