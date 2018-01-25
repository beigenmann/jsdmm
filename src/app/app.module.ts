import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {WebBluetoothModule} from '@manekinekko/angular-web-bluetooth';

import {AboutComponent} from './about/about.component';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DataService} from './data.service';
import {DmmComponent} from './dmm/dmm.component';
import {MaterialModule} from './material.module';
import {BluetoothDMM} from './webbluetooth';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';

@NgModule({
  declarations: [AppComponent, AboutComponent, DmmComponent],
  imports: [
    BrowserModule, BrowserAnimationsModule, 
    MaterialModule, AppRoutingModule,  WebBluetoothModule.forRoot(),
  ],
  providers: [DataService, BluetoothDMM],
  bootstrap: [AppComponent]
})
export class AppModule {
}
