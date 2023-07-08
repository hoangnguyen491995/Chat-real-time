import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-Icon',
  templateUrl: './Icon.component.html',
  styleUrls: ['./Icon.component.css'],
  standalone: true,
  imports: [MatIconModule],
})
export class IconComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
