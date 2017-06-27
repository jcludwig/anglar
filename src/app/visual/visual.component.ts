import { Component, OnInit, ElementRef } from '@angular/core';
import { DatagenService } from "app/datagen.service";

@Component({
  selector: 'app-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.css']
})
export class VisualComponent implements OnInit {

  private viewport: powerbi.IViewport = { height: 300, width: 300 };

  constructor(private el: ElementRef, private datagen: DatagenService) { }

  ngOnInit() {
    let container = $(this.el.nativeElement).find('.content');
    let host = new powerbi.visuals.DefaultVisualHostServices();
    let colors = new powerbi.visuals.DataColorPalette();
    let style = powerbi.visuals.visualStyles.create();
    
    let plugin = powerbi.visuals.plugins.lineChart;
    let visual = plugin.create();
    visual.init({
      element: container,
      viewport: this.viewport,
      host: host,
      style: style,
    });

    this.datagen.dataStream.subscribe((dv) => {
      visual.onDataChanged({
        dataViews: [dv]
      });
    });
  }
}
