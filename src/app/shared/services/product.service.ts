import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GetIdType} from "../../../types/getId.type";
import {HeaderType} from "../../../types/header.type";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  public getAllIds(body: GetIdType, headers: HeaderType) {
    return this.http.post<any>('https://api.valantis.store:41000/', body, {headers})
  }
}
