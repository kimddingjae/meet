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

const html5QrCode = new Html5Qrcode("reader");
const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    alert(decodedText);
};
const config = { fps: 10, qrbox: { width: 250, height: 250 } };

// If you want to prefer front camera
html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);

