import { Directive, Input, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[myBedazzle]'
})
export class BedazzleDirective {
  @Input()
  dazzleColor: string;

  @Output()
  colorChanged = new EventEmitter<string>();

  @HostBinding('style.color')
  get color() {
    return this.dazzleColor;
  }

  @HostListener('click')
  onClick(): void {
    this.dazzleColor = "#" + Math.floor(Math.random() * 0xffffff).toString(16); 
    this.colorChanged.emit(this.dazzleColor);
  }

  constructor() { }
}
