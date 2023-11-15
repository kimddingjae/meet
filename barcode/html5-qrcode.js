
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

/*
const html5QrCode = new Html5Qrcode("reader");

// if you scanned , it will be write in clear text in your input field which in my case 'result'
const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    alert(decodedText)
};
const config = { fps: 200, qrbox: 400 };

// prefer the back camera else the front one 
html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);
*/
