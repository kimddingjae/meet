<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>[JQuery] 모바일 카메라 찍기</title>
  <script src="./qr.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
  
  <link href="https://fonts.googleapis.com/css?family=Ropa+Sans" rel="stylesheet">
  <style>
    body {
      font-family: 'Ropa Sans', sans-serif;
      color: #333;
      max-width: 640px;
      margin: 0 auto;
      position: relative;
    }

    #canvas {
      width: 100%;
    }

  </style>
  
</head>
<body>
    <canvas id="canvas" ></canvas>
  <br>
  <br>
  <br>

  <form method="get" action="submit()">
      <label style="font-size:50px"><input type="radio" name="type" value="qr"> QR</label>
      <label style="font-size:50px"><input type="radio" name="type" value="barcode"> Barcode</label>
      <label style="font-size:50px"><input type="radio" name="type" value="input"> 입력</label>
      <input id="data" type="text" value="" hidden>  
  </form>

  <button onclick="submit()">btn1</button>
  
  <a href="tel:01038859194"> <span> 전화 </span> </a>
  <script>
    var dataElement = document.getElementById("data");    
    var data = dataElement.value;
    cameraOn();
    function submit(){
      if(data == "" || data == null){
        alert("No Data");
      } else{
        alert(data);
      }
    }
    
  </script>
</body>
</html>


