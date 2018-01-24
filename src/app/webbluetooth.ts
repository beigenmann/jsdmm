

export class BluetoothDMM {

  constructor() {}


  requestDevice(){
    const filters = [
      {name: 'VC99'}
    ];
    navigator.bluetooth.requestDevice({
      filters: filters
    })
    .then(device => { /* ... */ })
    .catch(error => { console.log(error); });
  }
}
