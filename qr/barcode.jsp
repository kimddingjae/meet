<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
  <title>바코드 스캔</title>
  <script src="<c:url value='/./quagga.min.js'/>"></script>
  <style>
    #scanner-container {
      position: relative;
      width: 100%;
      height: calc(100% - 60px); /* 시작종료 버튼을 표시하기 위해서 위치 계산 */
    }

    #selectedImageContainer {
      margin-top: 10px;
    }

    #buttonContainer {
      position: fixed; 
      top: 0; 
      left: 0;
      right: 0;
      height: 50px;
      background-color: white;
      z-index: 100; 
    }

    .hidden {
      display: none;
    }
    
    canvas {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
  </style>
</head>
<body>
  <div id="scanner-container"></div>
  <div id="buttonContainer">
    <button id="startButton" onclick="startScanner()">시작</button>
    <button id="stopButton" onclick="stopScanner()" class="hidden">종료</button>
  </div>
  <div id="selectedImageContainer"></div>

<script>
  var scannerIsRunning = false;	// 스캐너 실행상태
  var previousBarcode = ""; 	// 정합성을 위하여 이전 바코드 스캔값을 저장

  //시작버튼을 클릭하면 startScanner 함수 호출
  function startScanner() {
	  
	/* scannerIsRunning 초기값이 false이므로 동작, 
	   종료버튼을 클릭하면 scannerIsRunning=false로 변경  */
    if (!scannerIsRunning) {
      
    	// quagga.min.js에서 선언된 스캐너(Quagga) 초기화 
		// <video>와 <canvas>가 생성되며 각 정보를 초기화하는 부분    	
    	Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: "#scanner-container",	//바코드 인식 대상 정보(video와 canvas가 추가될 부분) 
            constraints: {
              width: 640, 
              height: 480, 
              facingMode: "environment", // 접속한 클라이언트에서 사용가능한 카메라
            },
          },
          decoder: {
            readers: [	// 바코드 유형 추가 http://www.gs1kr.org/front/board/appl/GS1Stnd.asp 참고
              "code_128_reader",	
              "ean_reader",			
              "ean_8_reader",		
              "code_39_reader",		
              "code_39_vin_reader", 
              "codabar_reader",		
              "upc_reader",			
              "upc_e_reader",
              "i2of5_reader",
            ],
            /* 개발과정에서만 사용하고 실제로는 비활성화
            debug: {
              showCanvas: true,				//스캔 영상 보여주는 캔버스 표시
              showPatches: true,			//추출된 패치를 표시
              showFoundPatches: true,		//검출된 바코드 패치를 표시
              showSkeleton: true,			//바코드 패치의 스캔 라인을 표시
              showLabels: true,				//바코드 타입과 위치에 대한 레이블을 표시
              showPatchLabels: true,		//패치의 레이블을 표시
              showRemainingPatchLabels: true,	// 남은 패치의 레이블을 표시
              boxFromPatches: {				//패치로부터 계산된 상자의 변환 정보를 표시
                showTransformed: true,		//변환된 패치를 표시
                showTransformedBox: true,	//변환된 상자를 표시
                showBB: true,				//바운딩 박스를 표시
              },              
            },
            */
          },
        },
        
        //에러 발생시
        function (err) {
          if (err) {
            console.error(err);	//콘솔에 에러 표시
            return;
          }
          
          //정상적으로 준비되면 콘솔에 아래 문구 표시
          console.log("스캐너 준비 완료");
          
          //스캐너 시작
          Quagga.start();
          
          //변수값 변경
          scannerIsRunning = true;
          
          //시작버튼 숨김
          document.getElementById("startButton").classList.add("hidden");
          
          //종료버튼 활성화 (class 값의 hidden 삭제)
          document.getElementById("stopButton").classList.remove("hidden");
        }
      );
    }
  }

  /* 종료버튼을 클릭하면 stopScanner 함수 호출 */
  function stopScanner() {
	
	//스캐너 상태가 true이므로 동작
    if (scannerIsRunning) {
    	
      //스캐너 종료
      Quagga.stop();
      
      //스캐너 상태값 변경
      scannerIsRunning = false;
      
      //시작버튼 표시 (class 값의 hidden 삭제)
      document.getElementById("startButton").classList.remove("hidden");
      
      //종료버튼 숨김
      document.getElementById("stopButton").classList.add("hidden");
    }
  }

  // 바코드 인식 선택사항
  // 바코드가 인식되는 부분(result)을 표시(녹색사각형과 빨간 가로줄)
    Quagga.onProcessed(function (result) {
    //캠버스 가로세로 길이 변수
    var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

    if (result) {
      if (result.boxes) {
    	//그리는 영역 초기화
        drawingCtx.clearRect(
          0,
          0,
          parseInt(drawingCanvas.getAttribute("width")),
          parseInt(drawingCanvas.getAttribute("height"))
        );
    	
    	//바코드 부분만 인식하여 녹색 사각형 그리기(가능성이 있는 모든 부분)
        result.boxes
          .filter(function (box) {
            return box !== result.box;
          })
          .forEach(function (box) {
            Quagga.ImageDebug.drawPath(
              box,
              { x: 0, y: 1 },
              drawingCtx,
              { color: "green", lineWidth: 2 }
            );
          });
      }

      //인식한 박스가 바코드인지 확인 맞으면 파란색 사각형 그리기
      if (result.box) {
        Quagga.ImageDebug.drawPath(
          result.box,
          { x: 0, y: 1 },
          drawingCtx,
          { color: "#00F", lineWidth: 2 }
        );
      }

      //파란색 사각형 안의 코드가 바코드가 맞으면 발간 가로줄 표시
      if (result.codeResult && result.codeResult.code) {
        Quagga.ImageDebug.drawPath(
          result.line,
          { x: "x", y: "y" },
          drawingCtx,
          { color: "red", lineWidth: 3 }
        );
      }
    }
  }); 

  
  //바코드 스캔값이 연속하여 targetMatches과 같다면
  //경고창에 바코드 값 출력
  var consecutiveMatches = 0; // 연속 일치 횟수
  var targetMatches = 30; // 목표 일치 횟수

  Quagga.onDetected(function (result) {
    var barcodeValue = result.codeResult.code;
    
    console.log("바코드 값: " + barcodeValue);

    if (barcodeValue === previousBarcode) {
      consecutiveMatches++;
    } else {
      consecutiveMatches = 1;
    }

    previousBarcode = barcodeValue;

    if (consecutiveMatches === targetMatches) {
      alert("바코드 값: " + barcodeValue);      
    }
  });
</script>

</body>
</html>
