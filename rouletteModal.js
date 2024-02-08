let body = document.querySelector("body");
const modal = document.querySelector(".modal");

window.addEventListener("message", handleDocHeightMsg, false); // 메시지 수신 이벤트 등록

function handleDocHeightMsg(eventObj) {
  // 메시지 수신 처리를 위한 함수
  if (eventObj.data == "x") {
    modal.classList.toggle("show");
    body.style.overflow = "auto";
    main.classList.toggle("noshow");
  } else if (eventObj.data == "xx") {
    main.classList.toggle("noshow");
  }
}

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.toggle("show");
    if (!modal.classList.contains("show")) {
      body.style.overflow = "auto";
    }
  }
});
