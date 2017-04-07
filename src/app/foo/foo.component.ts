import { Component, OnInit } from '@angular/core';
import { Ping } from "app/generator/generator.component";

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.css']
})
export class FooComponent implements OnInit {

  pings: Ping[] = [];

  constructor() { }

  ngOnInit() {
  }

  onPing(ping: Ping): void {
    this.pings.push(ping);
    console.log('received ping');
  }
}