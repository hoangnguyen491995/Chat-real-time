import { Component, OnInit } from '@angular/core';
import { DataService1 } from 'src/app/service/data/Data.service';
import { PopoverService } from 'src/app/service/popover/popover.service';

@Component({
  selector: 'app-listMessage',
  templateUrl: './listMessage.component.html',
  styleUrls: ['./listMessage.component.css']
})
export class ListMessageComponent implements OnInit {

  constructor(private popoverService : PopoverService, private dataService: DataService1) { }

  ngOnInit() {
  }

  showPopover: boolean = false;

  togglePopover() {
    this.showPopover = !this.showPopover;
  }

  onMessageClick() {
    this.popoverService.setPopoverVisibility(true);
  }


  saveData(): void {
    const data = { name: 'John', age: 25 };
    this.dataService.setData(data);
  }

  loadData(): void {
    const data = this.dataService.getData();
    console.log(data);
  }

}
