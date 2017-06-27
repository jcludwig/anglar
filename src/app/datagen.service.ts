import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import SQExprBuilder = powerbi.data.SQExprBuilder;

@Injectable()
export class DatagenService {

  public dataStream: Observable<powerbi.DataView>;

  constructor() {
    let data: any[][] = [];
    this.dataStream = Observable.interval(400)
      .map((i) => {
        data.push(this.getRow());
        return data;
      })
      .map((rows) => DatagenService.toDataView(rows));
  }

  private static toDataView(data: any[][]): powerbi.DataView {
    let categories = data.map(row => row[0]);
    let categoryColumnRef = SQExprBuilder.columnRef(SQExprBuilder.entity('s', 'e'), 'c');

    let y = data.map(row => row[1]);
    let yColumnRef = SQExprBuilder.columnRef(SQExprBuilder.entity('s', 'e'), 'y');

    let dv = powerbi.data.createCategoricalDataViewBuilder()
      .withCategory({
        source: {
          displayName: 'Category',
          expr: categoryColumnRef,
          identityExprs: [categoryColumnRef],
          isMeasure: false,
          index: 0,
          queryName: 'c',
          roles: { ['Category']: true },
          type: { numeric: true },
        },
        identityFrom: {
          fields: [categoryColumnRef],
          identities: categories.map(c => powerbi.data.createDataViewScopeIdentity(SQExprBuilder.equal(categoryColumnRef, SQExprBuilder.typedConstant(c, { text: true })))),
        },
        values: categories,
      })
      .withValues({
        columns: [{
          source: {
            displayName: 'Y',
            expr: yColumnRef,
            identityExprs: [yColumnRef],
            isMeasure: true,
            index: 1,
            queryName: 'y',
            roles: { ['Y']: true },
            type: { numeric: true },
          },
          values: y
        }]
      })
      .build();

      return dv;
  }

  private x: number = 0;
  private getRow(): any[] {
    return [this.x++, Math.random(), Math.random(), Math.random()];
  }
}
