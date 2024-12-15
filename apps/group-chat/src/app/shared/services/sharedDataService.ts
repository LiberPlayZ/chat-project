import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedDataService {
  private selectDataSubject = new BehaviorSubject<any | null>(null);
  selectedData$ = this.selectDataSubject.asObservable();

  selectData(data: any, event: string) {
    this.selectDataSubject.next({ data: data, event: event });
  }
}
