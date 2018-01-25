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
          .discover$({   filters: [
            { name: '' },
            { namePrefix: '0' },
            { namePrefix: '1' },
            { namePrefix: '2' },
            { namePrefix: '3' },
            { namePrefix: '4' },
            { namePrefix: '5' },
            { namePrefix: '6' },
            { namePrefix: '7' },
            { namePrefix: '8' },
            { namePrefix: '9' },
            { namePrefix: 'a' },
            { namePrefix: 'b' },
            { namePrefix: 'c' },
            { namePrefix: 'd' },
            { namePrefix: 'e' },
            { namePrefix: 'f' },
            { namePrefix: 'g' },
            { namePrefix: 'h' },
            { namePrefix: 'i' },
            { namePrefix: 'j' },
            { namePrefix: 'k' },
            { namePrefix: 'l' },
            { namePrefix: 'm' },
            { namePrefix: 'n' },
            { namePrefix: 'o' },
            { namePrefix: 'p' },
            { namePrefix: 'q' },
            { namePrefix: 'r' },
            { namePrefix: 's' },
            { namePrefix: 't' },
            { namePrefix: 'u' },
            { namePrefix: 'v' },
            { namePrefix: 'w' },
            { namePrefix: 'x' },
            { namePrefix: 'y' },
            { namePrefix: 'z' },
            { namePrefix: 'A' },
            { namePrefix: 'B' },
            { namePrefix: 'C' },
            { namePrefix: 'D' },
            { namePrefix: 'E' },
            { namePrefix: 'F' },
            { namePrefix: 'G' },
            { namePrefix: 'H' },
            { namePrefix: 'I' },
            { namePrefix: 'J' },
            { namePrefix: 'K' },
            { namePrefix: 'L' },
            { namePrefix: 'M' },
            { namePrefix: 'N' },
            { namePrefix: 'O' },
            { namePrefix: 'P' },
            { namePrefix: 'Q' },
            { namePrefix: 'R' },
            { namePrefix: 'S' },
            { namePrefix: 'T' },
            { namePrefix: 'U' },
            { namePrefix: 'V' },
            { namePrefix: 'W' },
            { namePrefix: 'X' },
            { namePrefix: 'Y' },
            { namePrefix: 'Z' }
          ],optionalServices: ['generic_access']})
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
