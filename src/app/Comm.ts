import { UsbDevice } from './typings/webusb/webusb';

export class CommPort {

  device_: UsbDevice;
  onReceive: Function;
  onReceiveError: Function;

  constructor(device: any) {
    this.device_ = device;
  }

  connect() {
    let readLoop = () => {
      this.device_.transferIn(5, 64).then(result => {
        console.log(result.data );
        this.onReceive(result.data);
        readLoop();
      }, error => {
        this.onReceiveError(error);
      });
    }

    return this.device_.open()
      .then(() => {
          console.log( 'selectConfiguration ' );
          if (this.device_.configuration === null) {
            return this.device_.selectConfiguration(1);
          }
      })
      .then(() => {
        console.log( 'in '  + this.device_.configuration.interfaces[2].interfaceNumber );
         this.device_.claimInterface(this.device_.configuration.interfaces[2].interfaceNumber );
      })/*.then(() => {
        console.log( 'selectAlternateInterface '  );
        this.device_.selectAlternateInterface(2, 0);
      })*/
      .then(() => this.device_.controlTransferOut({
        requestType: 'class',
        recipient: 'interface',
        request: 0x22, // CDC_SET_CONTROL_LINE_STATE
        value: 0x01,
        index: 0x02
      }))
      .then(() => {
        readLoop();
      });
  }

  disconnect() {
    return this.device_.controlTransferOut({
      'requestType': 'class',
      'recipient': 'interface',
      'request': 0x22,
      'value': 0x01,
      'index': 0x01
    })
      .then(() => this.device_.close());
  };

  send(data) {
    return this.device_.transferOut(4, data);
  };
}


export class Comm {

  getPorts() {
    return navigator.usb.getDevices().then(devices => {
      return devices.map(device => new CommPort(device));
    });
  }

  requestPort() {
    const filters = [
      /*{ 'vendorId': 0x16c0, 'productId': 0x05df },
      { 'vendorId': 0x2341, 'productId': 0x8037 },*/
    ];
    return navigator.usb.requestDevice({ 'filters': filters }).then(
      device => new CommPort(device)
    );
  }

};
