import { Component, OnInit } from '@angular/core';
import { DataService,DDMDEV } from './data.service';

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
    this.port = this.data.getPorts();
    this.dmmdevice = this.data.dmmdevice;
  }
  connectPort(){
    this.data.connectPort(this.selectedDMMValue,this.selectedPathValue);
  }

  
}
