chrome.app.runtime.onLaunched.addListener(function() {
    chrome.serial.getDevices(function(devices) {
        console.log("onSetControlSignals: " + devices);
      });
    chrome.app.window.create('index.html',
       {
           frame: 'Digital Voltmeter', 
           id: "mainwin",
           innerBounds: {width: 600, height: 600}
       });
  });