import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Comm, CommPort } from './Comm';
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
export class DataService implements OnInit {
  Connect_Text: string = 'Connect';
  private _Comm: Comm;
  private dev: DDMDEV
  private valueSubject: Subject<{ value: string, unit: string, map: Map<string, object> }> = new Subject();

  dmmdevice = [
  ];

  constructor() {
    this._Comm = new Comm();
    
    this._Comm.getPorts().then(devices => {
      if (devices) {
        devices.forEach(device => {
          console.log(device );
         
          device.onReceive = this.onReceive;
          device.onReceiveError = error => {
            console.log( 'error1 ' + error );
          };
          
          device.connect().then(data => {
            console.log( 'Connected' );
          }).catch(error =>{
            console.log( 'error2 ' + error);
          })
          return;
        });
      }
    });
    const device: DDMDEV[] = (<any>dmmconfig).device;
    device.forEach(devItem => {
      this.dmmdevice.push({ value: devItem, viewValue: devItem.name });

    });


  }
  ngOnInit() {
    console.log('On init');
  }
  getValue(): Observable<{ value: string, unit: string, map: Map<string, object> }> {
    return this.valueSubject.asObservable();
  }

  getPorts() {
    let port = [

    ];
    serialPort.list((err, ports) => {
      if (err) {
        console.log('err');
        return;
      }
      ports.forEach(portItem => {
        port.push({ value: portItem.comName, viewValue: portItem.comName });
      });
    });
    return port;
  }
  private dmmbuffer_size: number = 14;
  private arrayBuffer: number[] = [this.dmmbuffer_size];
  private arrayIndex: number = 0;
  onReceive(data ){
    console.log('onReceive:' +data);
    if (data) {
      const byteArray = new Uint8Array(data);
      for (var i = 0; i < byteArray.byteLength; i++) {
        const item = byteArray[i];
        this.arrayBuffer[this.arrayIndex++] = item;
        if (item == 0x0a) {
          this.doParse(this.arrayBuffer, this.dev);
          this.arrayIndex = 0;
        }
      }
    } else {
      return;
    }
  }
  
  doParse(arrayBuffer: number[], dev: DDMDEV) {
    this.dev = dev;
    let map: Map<string, object> = new Map<string, object>();
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
    this.valueSubject.next({ value: disp, unit: unit, map: map });
  }

  connectPort(dev: DDMDEV, selectedPathValue: string) {
    this._Comm.requestPort().then(device => {
      console.log(device );
    });



    if (dev && selectedPathValue) {
      
     
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
              this.onReceive(data);
            });
          }
        });

      } else {
        this.Connect_Text = 'Connect';
      }
    } else {
      return;
    }

  }
}
