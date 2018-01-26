import {Component, OnInit} from '@angular/core';
import {DataService, DDMDEV} from './data.service';
import {BluetoothDMM} from './webbluetooth';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  title = 'app';
  device: any = {};
  Connect_Text: string = 'Connect';
  Connect_USBText: string = 'Connect USB';
  Connect_BlueToothText: string = 'Connect Bluetooth';
  selectedPathValue: string;
  selectedDMMValue: DDMDEV;
  dmmdevice = [];
  port = [

  ];



  constructor(private data: DataService, private bluetooth: BluetoothDMM) {}


  ngOnInit() {
    this.dmmdevice = this.data.dmmdevice;
    this.getDeviceStatus();
    this. bluetooth. streamValues().subscribe(this.showDMM.bind(this));
  }
  onPath() {}
  onDev() {}
  connectUSBPort() {}

  
  connectBlueToothPort() {
    try{      
      this.bluetooth.requestDevice().subscribe(this.showDMM.bind(this));
    }
    catch(e) {

    }
  }
  connectPort() {
    this.data.connectPort(this.selectedDMMValue, this.selectedPathValue);
  }

  getDeviceStatus() {
    this.bluetooth.getDevice().subscribe(
      (device) => {

        if(device) {
          this.device = device;
        }
        else {
          // device not connected or disconnected
          this.device = null;
        }
      }
    );
  }

  showDMM(value: number){
    console.log('number'+ value);
  }
}
