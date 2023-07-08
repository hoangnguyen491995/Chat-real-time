import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  standalone: true,
  imports: [MatIconModule],
})
export class MessageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
