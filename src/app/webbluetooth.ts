import {Injectable} from '@angular/core';
import {BluetoothCore} from '@manekinekko/angular-web-bluetooth';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BluetoothDMM {
  static GATT_CHARACTERISTIC_BATTERY_LEVEL = 'battery_level';
  static GATT_PRIMARY_SERVICE = 'battery_service';
  constructor(private ble: BluetoothCore) {}

  getDevice() {
    // call this method to get the connected device
    return this.ble.getDevice$();
  }
  
  requestDevice(): Observable<number> {
    console.log('requestDevice' + this.ble);

    try {
      return this
          .ble

          // 1) call the discover method will trigger the discovery process (by
          // the browser)
          .discover$({acceptAllDevices: true,  optionalServices: [BluetoothDMM.GATT_PRIMARY_SERVICE] })
          // 2) get that service
          .mergeMap(
              (gatt: BluetoothRemoteGATTServer) => 
                this.ble.getPrimaryService$(
                  gatt, BluetoothDMM.GATT_PRIMARY_SERVICE)
                )
          // 3) get a specific characteristic on that service
          .mergeMap(
              (primaryService: BluetoothRemoteGATTService) =>
                  this.ble.getCharacteristic$(
                      primaryService,
                      BluetoothDMM.GATT_CHARACTERISTIC_BATTERY_LEVEL))
          // 4) ask for the value of that characteristic (will return a
          // DataView)
          .mergeMap(
              (characteristic: BluetoothRemoteGATTCharacteristic) =>
                  this.ble.readValue$(characteristic))
          // 5) on that DataView, get the right value
          .map(value => value.getUint8(0));
      }
    catch (e) {
      console.error('Oops! can not read value from %s' + e);
    }
  }

  streamValues() {
    return this.ble.streamValues$().map((value: DataView) => {
      return value.getUint8(0);
    });
  }
}
