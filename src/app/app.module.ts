import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { BluetoothDMM } from './webbluetooth';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { DmmComponent } from './dmm/dmm.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    DmmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [DataService, BluetoothDMM],
  bootstrap: [AppComponent]
})
export class AppModule { }
