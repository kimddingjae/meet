/*
const html5QrCode = new Html5Qrcode("reader");

// if you scanned , it will be write in clear text in your input field which in my case 'result'
const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    alert(decodedText);
    //document.getElementById('result').value = decodedText;
};
const config = { fps: 10, qrbox: 400 };

// prefer the back camera else the front one 
html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);

const start = document.getElementById('html5-qrcode-button-camera-permission');
start.click();

const select = document.getElementById('html5-qrcode-select-camera');
select.click();
*/
var html5QrCode = new Html5Qrcode("reader");
    const config = { fps: 15, qrbox: 500 };
    
    function qrCodeSuccessCallback(successMessage) {
       alert(successMessage)
    };
    html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback)

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
  "reader", config,  false);
html5QrcodeScanner.render(onScanSuccess);

var select = document.getElementsByTagName("select").value;
alert(select)
    
const start = document.getElementById('html5-qrcode-button-camera-permission');
start.click();

const select = document.getElementById('html5-qrcode-select-camera');
select.click();
*/

