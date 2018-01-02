import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dmm',
  templateUrl: './dmm.component.html',
  styleUrls: ['./dmm.component.scss']
})
export class DmmComponent implements OnInit {
  SEVENSG_VALUE_Text: string = '0.000';
  SEVENSG_UNIT_Text: string = 'mV';
  SEVENSG_ICON_Text: string = 'F';
  constructor(private data:DataService) { 
    this.SEVENSG_VALUE_Text  = '12.34';
  }


  ngOnInit() {
    this.data.getValue().subscribe(value=>{
      this.SEVENSG_VALUE_Text = value.value;
      this.SEVENSG_UNIT_Text = value.unit
      console.log(value.value);
      console.log(value.unit);
    });
    

    /*this.data.getValue().subscribe( x =>{
      this.SEVENSG_VALUE_Text =x.value;
      this.SEVENSG_UNIT_Text =x.unit;
    } );*/
  }

}
