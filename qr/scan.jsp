<%@page language="java"%>
<%@ page pageEncoding="UTF-8" language="java" contentType="text/html; charset=UTF-8"%>
<%
 	request.setCharacterEncoding("UTF-8");
%>

<!DOCTYPE html>
<html>
	<head>
	  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
     
	  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	  <link href="https://fonts.googleapis.com/css?family=Ropa+Sans" rel="stylesheet">
	  <style>
	    body {
	      font-family: 'Ropa Sans', sans-serif;
	      color: #333;
	      max-width: 640px;
	      margin: 0 auto;
	      display: flex;
	      flex-direction: column;
	      justify-content: center;
	      align-items: center;
	    }
	
	    #canvas {
	      width: 100%;
	    }
	
	    #container {
	      width:640px;
	      height:480px;
	      display: flex;
	      flex-direction: column;
	      justify-content: center;
	      align-items: center;
	    }
	
	    #codeText{
	      width:100%;
	      font-size:30px;
	    }
	
	    #tel{
	      position:absolute;
	      bottom:10px;
	    }
	
	    #inputText, #inputTextLabel{
	      height:40px
	    }
	    
	  </style>
	</head>
	<body>
	
	<div id="container">
    <div id="canvasContainer" style="display:block">
      <canvas id="canvas" style="display:block" ></canvas>
      <span id="codeText"></span>
      <button id="reCamera" onclick="cameraOn()">재촬영</button>
      <span id="test"></span>
    </div>
    <div id="inputContainer" style="display:none">
      <label id="inputTextLabel" for="inputText" >입력 : </label>  
      <input id="inputText" type="text" value="" >
    </div>
	</div>  
	<br>
	<br>
	<br>
	
    <form method="get" action="submit()">
      <label style="font-size:50px"><input type="radio" name="type" value="qr" > QR</label>
      <label style="font-size:50px"><input type="radio" name="type" value="barcode" checked> Barcode</label>
      <label style="font-size:50px"><input type="radio" name="type" value="input"> 입력</label>
      <input id="data" type="text" value="" hidden>  
    </form>
	
	  <button onclick="submit()" style="width:100px;height:100px">확인</button>
	  <div>
	  <a id="tel" href="tel:01038859194"> <span> 전화연결 </span> </a>
	  </div>
  		<script src="./jsQR.js"></script>
		<script language="javascript">
		var video = document.createElement("video");
	    var canvasContainerElement = document.getElementById("canvasContainer");
	    var canvasElement = document.getElementById("canvas");
	    var canvas = canvasElement.getContext("2d");
	    var dataElement = document.getElementById("data");
	    var data = dataElement.value;
	    var inputContainerElement = document.getElementById("inputContainer");
	    var codeTextElement = document.getElementById("codeText");
	    var reCameraElement = document.getElementById("reCamera");
	    var test = document.getElementById("test");
	    
	    $("input[name='type']:radio").change(function () {

	        var radio = this.value;
	        if(radio == "qr" || radio == "barcode"){
	          cameraOn();
	        } else if(radio == "input"){
	          canvasContainerElement.style.display = "none";
	          inputContainerElement.style.display = "block";
	        }
	        
	    });
	    
	    cameraOn();
	    function submit(){
	      var submitData = document.getElementById("data").value;
	      if("input" == document.querySelector('input[name="type"]:checked').value){
	        submitData = document.getElementById("inputText").value;
	      }
	      if(submitData == "" || submitData == null){
	        alert("No Data");
	      } else{
	        alert(submitData);
	      }
	    }
	    
	    function drawLine(begin, end, color) {
	      canvas.beginPath();
	      canvas.moveTo(begin.x, begin.y);
	      canvas.lineTo(end.x, end.y);
	      canvas.lineWidth = 4;
	      canvas.strokeStyle = color;
	      canvas.stroke();
	    }
	    function cameraOn() {
	      dataElement.value = "";
	      codeTextElement.style.display = "none";
	      canvasElement.style.display = "block";
	      reCameraElement.style.display = "none";
	      
	      if("qr" == document.querySelector('input[name="type"]:checked').value){
	        
	        // Use facingMode: environment to attemt to get the front camera on phones
	        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
	          video.srcObject = stream;
	          video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
	          video.play();
	          requestAnimationFrame(qr);
	        });
	  
	      } else if("barcode" == document.querySelector('input[name="type"]:checked').value){
	         navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then((stream) => {
	           let capturer = new ImageCapture(stream.getVideoTracks()[0]);
	           barcode(capturer);
	         });
	      }
	      
	    }

	    function qr() {
	      if(canvasElement.style.display == "none" || "qr" != document.querySelector('input[name="type"]:checked').value) return;
	      if (video.readyState === video.HAVE_ENOUGH_DATA) {
	        test.innerText = "qr";
	        canvasElement.hidden = false;
	        canvasElement.height = 480;
	        canvasElement.width = 640;
	        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
	        var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
	        var code = jsQR(imageData.data, imageData.width, imageData.height, {
	          inversionAttempts: "dontInvert",
	        });
	        if (code && code.trim != "" && code != null) {
	          drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
	          drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
	          drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
	          drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
	          dataElement.value = code.data;
	          codeTextElement.innerText = code.data;
	          fn_test();
	          canvasElement.style.display = "none";
	          codeTextElement.style.display = "block";
	          reCameraElement.style.display = "block";
	        } 
	      }
	      requestAnimationFrame(qr);
	    }

	    function barcode(capturer){
	      
	      if(canvasElement.style.display == "none" || "barcode" != document.querySelector('input[name="type"]:checked').value) return;
	      test.innerText = "barcode";
	      capturer.grabFrame().then((bitmap) => {
	        canvasElement.height = 480;
	        canvasElement.width = 640;
	        
	        canvas.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, canvasElement .width, canvasElement .height);
	        var barcodeDetector = new BarcodeDetector();
	        barcodeDetector.detect(bitmap)
	          .then(barcodes => {
	            var barcodeData = barcodes.map(barcode => barcode.rawValue).join(', ');
	  	  
	  	  if(barcodeData.trim() == "" || barcodeData == null){ 
	  	    barcode(capturer);
	  	  } else{
	        dataElement.value = barcodes.map(barcode => barcode.rawValue).join(', ');
	        codeTextElement.innerText = barcodes.map(barcode => barcode.rawValue).join(', ');
	        fn_test();
	        canvasElement.style.display = "none";
	        codeTextElement.style.display = "block";
	        reCameraElement.style.display = "block";
	  	    //canvasElement.hidden = true;	  
	  	  }
	          })
	          .catch((e) => {
	            console.error(e);
	            //document.getElementById("barcodes").innerHTML = 'None';
	          });
	      });
	    }
	    if (! window.NEXACROHTML) {
			window.NEXACROHTML = {};
		}
		
		window.NEXACROHTML.FireUserNotify = function(userdata)
		{			
			var pp = window.NEXACROWEBBROWSER;
			if (pp) 
			{		
				pp.on_fire_onusernotify(pp, userdata);
			} 
			else if (typeof nexacro == "undefined") //windows runtime
			{			
				window.document.title = userdata;
			}
			else if (nexacro) //mobile runtime 
			{ 		
				nexacro.fireUserNotify(userdata);	
			} 
		}
		
	    function fn_test()
	    {
	    	window.NEXACROHTML.FireUserNotify(document.getElementById("data").value);
	    	
	    }
		</script>
	</body> 
</html>