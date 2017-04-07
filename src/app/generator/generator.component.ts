import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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
    let raisePing = () => {
      this.ping.emit({ payload: Math.random() });
      setTimeout(raisePing, 1000);
    };

    setTimeout(raisePing, 1000);
  }
}

export interface Ping {
  payload: number;
}
