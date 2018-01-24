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
    this.port = this.data.getPorts();
    this.dmmdevice = this.data.dmmdevice;
  }
  onPath() {}
  onDev() {}
  connectUSBPort() {}

  connectBlueToothPort() {
    this.bluetooth.requestDevice();
  }
  connectPort() {
    this.data.connectPort(this.selectedDMMValue, this.selectedPathValue);
  }
}
