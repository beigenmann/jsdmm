import { Component, OnInit, NgZone } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dmm',
  templateUrl: './dmm.component.html',
  styleUrls: ['./dmm.component.scss']
})
export class DmmComponent implements OnInit {
  _DmmBar: DmmBar;
  SEVENSG_VALUE_Text: string = '0.000';
  SEVENSG_UNIT_Text: string = 'mV';
  SEVENSG_ICON_Text: string = 'ABCDEFGHI';
  constructor(private data: DataService, private zone: NgZone) {
    
  }


  ngOnInit() {
    this._DmmBar = new DmmBar(document.getElementById('rule-wrapper'));
    this._DmmBar.ngOnInit();
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
        if (value.map.get("BAR_VALUE")) {
          const val: number = Number(value.map.get("BAR_VALUE"));
          if ('' + value.map.get("SI_UNIT") == 'A' || '' + value.map.get("SI_UNIT") == 'V'|| '' + value.map.get("SI_UNIT") == '\u03A9') {
            this._DmmBar.createRuler(val, true);
          }else{
            this._DmmBar.createRuler(val, false);
          }
        }
        console.log(value.value);
        console.log(value.unit);
      });
    });
  }
}

export class DmmBar implements OnInit {
  context: CanvasRenderingContext2D;
  constructor(private ruler_wrapper: HTMLElement) { };
  ngOnInit() {
    let w: number = window.innerWidth;
    let h: number = window.innerHeight;
    this.ruler_wrapper.innerHTML = '';
    this.ruler_wrapper.innerHTML += '<canvas id="board" width="' + w + '" height="' + h + '"></canvas>';
    this.ruler_wrapper.innerHTML += '<div class="dimensions">' + w + 'px x ' + h + 'px</div>';
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('board');
    this.context = canvas.getContext('2d');
    // this.context.font = options.fontSize + ' ' + options.fontFamily;
    this.createRuler(0, false);
  };

  createRuler(value: number, hasBar: boolean) {
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    if (!hasBar) {
      return;
    }
    let spacing = (window.innerWidth - 50) / 60;
    this.context.lineWidth = 10;
    this.context.strokeStyle = '#555';
    this.context.beginPath();
    for (var interval = 0; interval <= value; interval++) {
      if (interval % 10 == 0) {
        this.context.moveTo(interval * spacing + 0.5, 20);
        this.context.lineTo(interval * spacing + 0.5, 0);
        var label = '' + Math.round(Math.abs(interval));
        //this.context.fillText(label, interval * spacing + 0.5, (15 / 2) + 1);
        this.context.stroke();
      }
      else {
        this.context.moveTo(interval * spacing + 0.5, 20);
        this.context.lineTo(interval * spacing + 0.5, 5);
        this.context.stroke();
      }
    }
    this.context.lineWidth = 1;
    for (var interval = 0; interval <= 60; interval++) {
      if (interval % 10 == 0) {
        this.context.moveTo(interval * spacing + 0.5, 50);
        this.context.lineTo(interval * spacing + 0.5, 35);
        var label = '' + Math.round(Math.abs(interval));
        this.context.fillText(label, interval * spacing - 5, 30);
        this.context.stroke();
      }
      else {
        this.context.moveTo(interval * spacing + 0.5, 50);
        this.context.lineTo(interval * spacing + 0.5, 45);
        this.context.stroke();
      }
    }
  }
}
