import { Component, OnInit } from '@angular/core';
import * as dmmconfig from '../assets/config/jsdmm.config.json';
import * as serialPort from 'browser-serialport/index';


let SerialPort = serialPort.SerialPort;
interface DDMDEV {
  name: string;
  serial: {
    baudrate: number,
    parity: string,
    rtscts: boolean,
    databits: number,
    stopbits: number,
    buffersize: number
  }
  val:string[],
  unit:string[],
  protocol: [{
    name: string,
    byteNr: number,
    mask: number,
    mapfrom: number,
    mapto: object,
    char:object
  }]
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {


  title = 'app';
  Connect_Text: string = 'Connect';
  selectedPathValue: string;
  selectedDMMValue: DDMDEV;

  port = [

  ];
  dmmdevice = [
  ];

  constructor() {
    //jsonf: dmmconfig.device = dmmconfig.default;

    const device: DDMDEV[] = (<any>dmmconfig).device;
    device.forEach(devItem => {
      this.dmmdevice.push({ value: devItem, viewValue: devItem.name });
      
    });
  }

  doParse(arrayBuffer: number[] ){
    let map = new Map<string, object>(); 
    this.selectedDMMValue.protocol.forEach(prod => {
      var val = arrayBuffer[prod.byteNr];
      if (prod.mask) {
        val = val & prod.mask;
      }
      if(prod.mapfrom){
        if(val == prod.mapfrom){
          map.set( prod.name, prod.mapto);
        }
      }else{
        if(prod.char){
          map.set( prod.name,new String(String.fromCharCode(val)));
        }else{
          map.set( prod.name,new Number(val));
        }
      }
    });
    let disp :string;
    let sign:string = String(map.get("SIGN"));
    if(sign && sign == '-'){
      disp = '-';
    }else{
      disp = '';
    }
    const val: Number = Number(map.get("POINT"));
    let nr = 0;
    this.selectedDMMValue.val.forEach(dist =>{
      const c:object  = map.get(dist);
      if(c){
        if(nr == val && nr != 0){
          disp = disp + '.' +c;
        }else{
          disp = disp + c;
        }
      }
      nr ++;
    });
    console.log(disp);
  }
  ngOnInit() {
    serialPort.list((err, ports) => {
      if (err) {
        console.log('err');
        return;
      }
      ports.forEach(portItem => {
        this.port.push({ value: portItem.comName, viewValue: portItem.comName });
      });
    });
  }


  connectPort() {
    const dmmbuffer_size: number = 14;
    let arrayBuffer: number[] = [dmmbuffer_size];
    let arrayIndex: number = 0;
    let dispvalue: string;
    if (this.Connect_Text == 'Connect') {
      var serialPort = new SerialPort(this.selectedPathValue, {
        baudrate: this.selectedDMMValue.serial.baudrate,
        parity: this.selectedDMMValue.serial.parity,
        rtscts: this.selectedDMMValue.serial.rtscts,
        databits: this.selectedDMMValue.serial.databits,
        stopbits: this.selectedDMMValue.serial.stopbits,
        buffersize: this.selectedDMMValue.serial.buffersize

      }, false); // this is the openImmediately flag [default is true]

      serialPort.open((error) => {

        if (error) {
          console.log('failed to open: ' + error);
        } else {
          console.log('open port ' + this.selectedPathValue + " " + this.selectedDMMValue.serial.baudrate);
          serialPort.on('data', (data) => {
            if (data) {
              const byteArray = new Uint8Array(data);
              for (var i = 0; i < byteArray.byteLength; i++) {
                const item = byteArray[i];
                arrayBuffer[arrayIndex++] = item;
                if (item == 0x0a) {
                  this.doParse(arrayBuffer);
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
