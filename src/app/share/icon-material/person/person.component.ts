import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  standalone: true,
  imports: [MatIconModule],
})
export class PersonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
