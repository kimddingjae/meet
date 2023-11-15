/*
function onScanSuccess(decodedText, decodedResult) {
    // Handle on success condition with the decoded text or result.
    alert(decodedText)
    console.log(`Scan result: ${decodedText}`, decodedResult);
    // ...
    //html5QrcodeScanner.clear();
    // ^ this will stop the scanner (video feed) and clear the scan area.
}
const scanner = new Html5QrcodeScanner('reader', {
                qrbox: {
                    width: 200,
                    height: 200,
                },
                fps: 5,
               videoConstraints: { facingMode: { exact: "environment" } },
            },
            false)
scanner.render(onScanSuccess);
*/

function onScanSuccess(decodedText, decodedResult) {
  // handle the scanned code as you like, for example:
  alert(decodedText);
}

let config = {
  fps: 10,
  qrbox: {width: 200, height: 200},
  rememberLastUsedCamera: true,
  // Only support camera scan type.
  //supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
};

let html5QrcodeScanner = new Html5QrcodeScanner(
  "reader", config, /* verbose= */ false);
html5QrcodeScanner.render(onScanSuccess);

const start = document.getElementById('html5-qrcode-button-camera-permission');
start.click();


