import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() min = 0;
  @Input() max = 100;
  @Input() bgColor = "#f09f19";
  @Input() valueColor = "#1fb266";
  @Input() step = 1;
  
  @Input() value?: number = 0;
  onChange = (value: number) => {};
  onTouched = () => {};
  touched = false;
  isDisabled = false;
  constructor() { }
  @Output() emitChange = new EventEmitter();
  
  ngOnInit() {
  }
  styledBackground() {
  }

  onValueChange(value: number){
    if(value){
      this.emitChange.emit(value);
      this.value = value;
      this.onChange(this.value);
    }
  }

  sayHello() {
    console.log('Hello from Child Component!');
  }

}
