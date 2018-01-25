import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';

@Injectable()
export class BluetoothDMM {
  static GATT_CHARACTERISTIC_BATTERY_LEVEL = 'battery_level';
  static GATT_PRIMARY_SERVICE = 'battery_service';
  constructor(private ble :BluetoothCore) {}

  requestDevice(): Observable<number> {
    console.log('Getting Battery Service...'+ this.ble);

    try {
        return this.ble

          // 1) call the discover method will trigger the discovery process (by the browser)
          .discover$({ filters: [], optionalServices: [BluetoothDMM.GATT_PRIMARY_SERVICE] })
          // 2) get that service
          .mergeMap(gatt => this.ble.getPrimaryService$(<BluetoothRemoteGATTServer>gatt, BluetoothDMM.GATT_PRIMARY_SERVICE))
          // 3) get a specific characteristic on that service
          .mergeMap(primaryService => this.ble.getCharacteristic$(primaryService, BluetoothDMM.GATT_CHARACTERISTIC_BATTERY_LEVEL))
          // 4) ask for the value of that characteristic (will return a DataView)
          .mergeMap(characteristic => this.ble.readValue$(<BluetoothRemoteGATTCharacteristic>characteristic))
            // 5) on that DataView, get the right value
          .map(value => value.getUint8(0));
    }
    catch(e) {
      console.error('Oops! can not read value from %s' + e);
    }

  }
 
}
