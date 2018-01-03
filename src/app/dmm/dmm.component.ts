import { Component, OnInit, NgZone } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dmm',
  templateUrl: './dmm.component.html',
  styleUrls: ['./dmm.component.scss']
})
export class DmmComponent implements OnInit {
  SEVENSG_VALUE_Text: string = '0.000';
  SEVENSG_UNIT_Text: string = 'mV';
  SEVENSG_ICON_Text: string = 'ABCDEFGHI';
  constructor(private data: DataService, private zone: NgZone) {

  }


  ngOnInit() {
    this.data.getValue().subscribe(value => {
      this.zone.run(() => {
        this.SEVENSG_VALUE_Text = value.value;
        this.SEVENSG_UNIT_Text = value.unit
        let icon: string = '';
        if (value.map.get("BEEP")) {
          icon = icon + 'B'
        }
        if (value.map.get("BATTERY")) {
          icon = icon + 'C'
        }
        if (value.map.get("DIODE")) {
          icon = icon + 'D'
        }
        if (value.map.get("DC")) {
          icon = icon + 'E'
        }
        if (value.map.get("AC")) {
          icon = icon + 'F'
        }
        if (value.map.get("SI_UNIT") && ('' + value.map.get("SI_UNIT")) == 'hFE') {
          icon = icon + 'G'
        }
        if (value.map.get("SI_UNIT") && ('' + value.map.get("SI_UNIT")) == 'F') {
          icon = icon + 'H'
        }
        this.SEVENSG_ICON_Text = icon;
        console.log(value.value);
        console.log(value.unit);
      });
    });
  }

}
