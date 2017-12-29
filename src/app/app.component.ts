import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent  implements OnInit {
  title = 'app';
  Connect_Text: string = 'Connect';
  selectedPathValue: string;
  selectedBaudValue: string;

  port = [
    {value: 'steak-0', viewValue: '/dev/ttyUSB0'},
    {value: 'pizza-1', viewValue: '/dev/ttyUSB1'},
    {value: 'tacos-2', viewValue: '/dev/ttyUSB2'}
  ];
  baudrate = [
    {value: '115200', viewValue: '115200'},
    {value: '57600', viewValue: '57600'},
    {value: '38400', viewValue: '38400'},
    {value: '19200', viewValue: '19200'},
    {value: '9600', viewValue: '9600'},
    {value: '4800', viewValue: '4800'},
    {value: '2400', viewValue: '2400'},
    {value: '600', viewValue: '600'},
    {value: '300', viewValue: '300'},
    {value: '200', viewValue: '200'},
    {value: '150', viewValue: '150'},
    {value: '134', viewValue: '134'},
    {value: '110', viewValue: '110'},
    {value: '75', viewValue: '75'},
    {value: '50', viewValue: '50'}
  ];

  constructor() { }

  ngOnInit() {
  }
  connectPort(){
    if(this.Connect_Text == 'Connect'){
      this.Connect_Text ='Disconnect' + ' ' + this.selectedPathValue;
    }else{
      this.Connect_Text ='Connect';
    }
  }
}
