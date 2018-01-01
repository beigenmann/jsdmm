import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dmm',
  templateUrl: './dmm.component.html',
  styleUrls: ['./dmm.component.scss']
})
export class DmmComponent implements OnInit {
  SEVENSG_VALUE_Text: string = '0.000';
  SEVENSG_UNIT_Text: string = 'mV';
  SEVENSG_ICON_Text: string = 'F';
  constructor() { }

  ngOnInit() {
  }

}
