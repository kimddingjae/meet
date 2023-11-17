  var scannerIsRunning = false;	// 스캐너 실행상태
  var loded = false;
  var previousBarcode = ""; 	// 정합성을 위하여 이전 바코드 스캔값을 저  	
  
  function reCamera(){
    scannerIsRunning = false;
    start_qr();
  }
  
  function load(){
    start_qr();
    const start = document.getElementById('html5-qrcode-button-camera-permission');
    start.click();
  }
  
  function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    if(decodedText.trim() != "" && decodedText != null && !scannerIsRunning){
      alert(decodedText)
      //fn_test(decodedText);
      scannerIsRunning = true;
    }
  }
  
  function start_qr(){
    let config = {
      fps: 10,
      qrbox: {width: 400, height: 400},
      rememberLastUsedCamera: true
      // Only support camera scan type.
      //supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
    };
    
    let html5QrcodeScanner = new Html5QrcodeScanner("reader", config,  false);
    html5QrcodeScanner.render(onScanSuccess);
  }
  
  if (!window.NEXACROHTML) {
    window.NEXACROHTML = {};
  }
  
  window.NEXACROHTML.FireUserNotify = function (userdata) {
    var pp = window.NEXACROWEBBROWSER;
    if (pp) {
      pp.on_fire_onusernotify(pp, userdata);
    } else if (typeof nexacro == "undefined") {
      //windows runtime
      window.document.title = userdata;
    } else if (nexacro) {
      //mobile runtime
      nexacro.fireUserNotify(userdata);
    }
  };
  
  function fn_test(result) {
     window.NEXACROHTML.FireUserNotify(result); 
  }
  
  function fn_mail(addr) {
    var url = "mailto:" + addr;      
      
    top.location.href = url;
    
  }
  
  function fn_tel(telNo) {
     var url = "tel:" + telNo;
      
     top.location.href = url;       
  }
  
  function fn_share(shareText){
    
    if(navigator.share){
      navigator.share({
        text : shareText,        
      })
      .then(() => console.log("공유 성공"))
      .catch((error) => console.log("공유 실패". error));
    } else{
      alert("공유 지원 X");
    }
        
  }
  
  
  