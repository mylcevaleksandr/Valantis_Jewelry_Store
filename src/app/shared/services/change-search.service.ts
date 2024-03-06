import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChangeSearchService {
  private searchChanged$: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  public setFalse() {
    this.searchChanged$.next(false);
  }

  public watchChanges(): Observable<boolean> {
    return this.searchChanged$.asObservable();
  }
}
