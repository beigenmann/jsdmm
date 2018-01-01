import { Component, OnInit  } from '@angular/core';
import * as dmmconfig from '../assets/config/jsdmm.config.json';
import * as serialPort from 'browser-serialport/index';


let SerialPort = serialPort.SerialPort;
interface DDMDEV {
  name: string;
  serial             : {
   baudrate:  number,
   parity: string,
   rtscts: boolean,
   databits: number,
   stopbits: number,
   buffersize: number
 }
 }
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent  implements OnInit {
  

  title = 'app';
  Connect_Text: string = 'Connect';
  selectedPathValue: string;
  selectedDMMValue: DDMDEV ;
  
 
 

  port = [
    
  ];
  dmmdevice = [
  ];

  constructor() { 
    //jsonf: dmmconfig.device = dmmconfig.default;

   const device: DDMDEV []= (<any>dmmconfig).device;
   device.forEach(devItem => {
    this.dmmdevice.push( {value: devItem, viewValue: devItem.name});
   });
  }
  

  ngOnInit() {
    serialPort.list((err, ports)=> {
      if ( err ) {
        console.log( 'err');
        return;
      }
      ports.forEach(portItem => {
        this.port.push( {value: portItem.comName, viewValue: portItem.comName});
      });
    });
  }
  

  connectPort(){
    const dmmbuffer_size: number = 14;
    let arrayBuffer:  number[] =[dmmbuffer_size];
    let arrayIndex: number = 0;
    let dispvalue: string;
    if(this.Connect_Text == 'Connect'){
      var serialPort = new SerialPort(this.selectedPathValue, {
        baudrate:  this.selectedDMMValue.serial.baudrate,
        parity: this.selectedDMMValue.serial.parity,
        rtscts: this.selectedDMMValue.serial.rtscts,
        databits: this.selectedDMMValue.serial.databits,
        stopbits: this.selectedDMMValue.serial.stopbits,
        buffersize: this.selectedDMMValue.serial.buffersize

      }, false); // this is the openImmediately flag [default is true]
      
      serialPort.open((error) => {
        
        if ( error ) {
          console.log('failed to open: '+error);
        } else {
          console.log('open port '+ this.selectedPathValue +" " +this.selectedDMMValue.serial.baudrate );
          serialPort.on('data', (data) => {
            if (data) {
              const byteArray = new Uint8Array(data);
              for (var i = 0; i < byteArray.byteLength; i++) {
                const item = byteArray[i];
                arrayBuffer[arrayIndex++] = item;
                console.log('date received: ' + typeof item );
                if(item == 0x0a){
                  console.log('block received: ' +  arrayBuffer );
                  arrayIndex = 0;
                }
              }
            }else{
              return;
            }
          });
        }
      });
    
    }else{
      this.Connect_Text ='Connect';
    }
  }
}
