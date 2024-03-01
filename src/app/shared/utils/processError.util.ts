import {Md5} from "ts-md5";
import {HeaderType} from "../../../types/header.type";
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";

export class ProcessErrorUtil {
  static handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log('An error occurred:', error.error);
    } else if (error.status === 401) {
      console.log(
        `Backend returned code ${error.status}, body was: `, error.error);
    } else if (error.status === 500) {
      console.log(`Backend returned code ${error.status}, body was: `, error.error);
    } else {
      console.log(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error(`Backend returned code ${error.status}, body was: ` + error.error));
  }
}
