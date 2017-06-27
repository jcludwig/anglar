import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {

  @Output()
  ping = new EventEmitter<Ping>();

  constructor() { }

  ngOnInit() {
    let timer = Observable.interval(1000)
      .subscribe((i) => { console.log(i); this.ping.emit({ payload: i }); });
  }
}

export interface Ping {
  payload: number;
}
