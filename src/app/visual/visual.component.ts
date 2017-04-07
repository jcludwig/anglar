import { Component, OnInit, ElementRef } from '@angular/core';

import SQExprBuilder = powerbi.data.SQExprBuilder;

@Component({
  selector: 'app-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.css']
})
export class VisualComponent implements OnInit {

  private viewport: powerbi.IViewport = { height: 300, width: 300 };

  constructor(private el: ElementRef) { }

  ngOnInit() {
    let container = $(this.el.nativeElement);
    let host = new powerbi.visuals.DefaultVisualHostServices();
    let colors = new powerbi.visuals.DataColorPalette();
    let style = powerbi.visuals.visualStyles.create();
    
    let plugin = powerbi.visuals.plugins.columnChart;
    let visual = plugin.create();
    visual.init({
      element: container,
      viewport: this.viewport,
      host: host,
      style: style,
    });

    visual.onDataChanged({
      dataViews: this.getDataViews()
    });
  }

  private getDataViews(): powerbi.DataView[] {
    let categories = this.data.map(row => row[0]);
    let categoryColumnRef = SQExprBuilder.columnRef(SQExprBuilder.entity('s', 'e'), 'c');


    let y = this.data.map(row => row[1]);
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
          type: { text: true },
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

      return [dv];
  }

  private data = [...VisualComponent.getRows(12)];

  private static getRows(count: number): any[] {
    let rows = [];
    let x = 0;
    for (let i = 0; i < count; i++)
      rows.push([x++, Math.random(), Math.random(), Math.random()]);
    
    return rows;
  }
}
