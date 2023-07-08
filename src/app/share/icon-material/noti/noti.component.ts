import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-noti',
  templateUrl: './noti.component.html',
  styleUrls: ['./noti.component.css'],
  standalone: true,
  imports: [MatIconModule],
})
export class NotiComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
