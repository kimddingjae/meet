
const html5QrCode = new Html5Qrcode("reader");

// if you scanned , it will be write in clear text in your input field which in my case 'result'
const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    alert(decodedText);
    //document.getElementById('result').value = decodedText;
};
const config = { fps: 5, qrbox: 200 };

// prefer the back camera else the front one 
html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);


/*
function onScanSuccess(decodedText, decodedResult) {
  // handle the scanned code as you like, for example:
  alert(decodedText);
}

let config = {
  fps: 10,
  qrbox: {width: 200, height: 200}
  //rememberLastUsedCamera: true,
  // Only support camera scan type.
  //supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
};

let html5QrcodeScanner = new Html5QrcodeScanner(
  "reader", config, /* verbose= */ false);
html5QrcodeScanner.render(onScanSuccess);

//const start = document.getElementById('html5-qrcode-button-camera-permission');
//start.click();
*/

