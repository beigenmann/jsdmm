import { Injectable ,OnInit} from '@angular/core';
import * as dmmconfig from '../assets/config/jsdmm.config.json';
import * as serialPort from 'browser-serialport/index';
let SerialPort = serialPort.SerialPort;
export interface DDMDEV {
  name: string;
  serial: {
    baudrate: number,
    parity: string,
    rtscts: boolean,
    databits: number,
    stopbits: number,
    buffersize: number
  }
  val: string[],
  unit: string[],
  protocol: [{
    name: string,
    byteNr: number,
    mask: number,
    mapfrom: number,
    mapto: object,
    char: object
  }]
}

@Injectable()
export class DataService implements OnInit{
  Connect_Text: string = 'Connect';
  dmmdevice = [
  ];
  
  constructor() { 
    const device: DDMDEV[] = (<any>dmmconfig).device;
    device.forEach(devItem => {
      this.dmmdevice.push({ value: devItem, viewValue: devItem.name });

    });
  }
  ngOnInit() {
    
  }

  doParse(arrayBuffer: number[], dev: DDMDEV) {
    let map = new Map<string, object>();
    dev.protocol.forEach(prod => {
      var val = arrayBuffer[prod.byteNr];
      if (prod.mask) {
        val = val & prod.mask;
      }
      if (prod.mapfrom) {
        if (val == prod.mapfrom) {
          map.set(prod.name, prod.mapto);
        }
      } else {
        if (prod.char) {
          map.set(prod.name, new String(String.fromCharCode(val)));
        } else {
          map.set(prod.name, new Number(val));
        }
      }
    });
    let disp: string;
    let sign: string = String(map.get("SIGN"));
    if (sign && sign == '-') {
      disp = '-';
    } else {
      disp = ' ';
    }
    const val: Number = Number(map.get("POINT"));
    let nr = 0;
    dev.val.forEach(dist => {
      const c: object = map.get(dist);
      if (c) {
        if (nr == val && nr != 0) {
          disp = disp + '.' + c;
        } else {
          disp = disp + c;
        }
      }
      nr++;
    });
    let unit: string = '';
    const si_pr: object = map.get("SI-PR");
    if (si_pr) { 
      unit = unit + si_pr;
    }
    const si_unit: object = map.get("SI_UNIT");
    if (si_unit) { 
      unit = unit + si_unit;
    }
    console.log(disp + ' ' + unit);
  }

  connectPort(dev: DDMDEV,selectedPathValue: string ) {
    const dmmbuffer_size: number = 14;
    let arrayBuffer: number[] = [dmmbuffer_size];
    let arrayIndex: number = 0;
    let dispvalue: string;

    if (this.Connect_Text == 'Connect') {
      var serialPort = new SerialPort(selectedPathValue, {
        baudrate: dev.serial.baudrate,
        parity: dev.serial.parity,
        rtscts: dev.serial.rtscts,
        databits: dev.serial.databits,
        stopbits: dev.serial.stopbits,
        buffersize: dev.serial.buffersize

      }, false); // this is the openImmediately flag [default is true]

      serialPort.open((error) => {

        if (error) {
          console.log('failed to open: ' + error);
        } else {
         //console.log('open port ' + this.selectedPathValue + " " + this.selectedDMMValue.serial.baudrate);
          serialPort.on('data', (data) => {
            if (data) {
              const byteArray = new Uint8Array(data);
              for (var i = 0; i < byteArray.byteLength; i++) {
                const item = byteArray[i];
                arrayBuffer[arrayIndex++] = item;
                if (item == 0x0a) {
                  this.doParse(arrayBuffer,dev);
                  arrayIndex = 0;
                }
              }
            } else {
              return;
            }
          });
        }
      });

    } else {
      this.Connect_Text = 'Connect';
    }
  }
}
