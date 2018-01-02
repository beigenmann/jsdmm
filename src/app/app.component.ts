import { Component, OnInit } from '@angular/core';
import { DataService,DDMDEV } from './data.service';
import * as serialPort from 'browser-serialport/index';
let SerialPort = serialPort.SerialPort;





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
  dmmdevice = [
  ];
  port = [

  ];
  
 

  constructor(private data:DataService) {
   
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
    this.dmmdevice = this.data.dmmdevice;
  }
  connectPort(){
    this.data.connectPort(this.selectedDMMValue,this.selectedPathValue);
  }

  
}
