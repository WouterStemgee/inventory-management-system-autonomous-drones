import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {map} from 'rxjs/operators';
import {Observable, of as observableOf, merge} from 'rxjs';

export interface InventoryDataItem {
  scanzoneId: string;
  id: string;
  name: string;
  quantity: number;
  x: number;
  y: number;
}

export class InventoryDatasource extends DataSource<InventoryDataItem> {
  data;

  constructor(products) {
    super();
    this.data = products;
  }

  connect(): Observable<InventoryDataItem[]> {
    const dataMutations = [
      observableOf(this.data)
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.data;
    }));
  }

  disconnect() {
  }
}
