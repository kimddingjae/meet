document.write('<script src="./jsQR.js"></script>');
    function drawLine(begin, end, color) {
      var canvasElement = document.getElementById("canvas");
      var canvas = canvasElement.getContext("2d");
      canvas.beginPath();
      canvas.moveTo(begin.x, begin.y);
      canvas.lineTo(end.x, end.y);
      canvas.lineWidth = 4;
      canvas.strokeStyle = color;
      canvas.stroke();
    }

    // Use facingMode: environment to attemt to get the front camera on phones
    function cameraOn(){
        
    var canvasElement = document.getElementById("canvas");
    var canvas = canvasElement.getContext("2d");
    var data = document.getElementById("data");
    var video = document.createElement("video");
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
          video.srcObject = stream;
          video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
          video.play();
          requestAnimationFrame(tick);
        });
    }
    function tick() {
      var canvasElement = document.getElementById("canvas");
      var canvas = canvasElement.getContext("2d");
      var data = document.getElementById("data");
      var video = document.createElement("video");
        
      //if (video.readyState === video.HAVE_ENOUGH_DATA) {
        if (true) {
          alert(3333333);  
        canvasElement.hidden = false;
        canvasElement.height = video.videoHeight;
        canvasElement.width = video.videoWidth;
          alert("height :::: " + canvasElement.height);
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
        var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
        var code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
        if (code) {
          drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
          drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
          drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
          drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
          alert(123)
          data.value = code.data;
          canvasElement.hidden = true;
        } else{
          requestAnimationFrame(tick);
        }
      }
      
    }
