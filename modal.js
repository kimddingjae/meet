const body = document.querySelector("body");
const modal = document.querySelector(".modal");
const btnOpenPopup = document.querySelector(".btn-open-popup");

 window.addEventListener('message', handleDocHeightMsg, false); // 메시지 수신 이벤트 등록

function handleDocHeightMsg(eventObj) { // 메시지 수신 처리를 위한 함수
    console.log(eventObj.data);
}

btnOpenPopup.addEventListener("click", () => {
  modal.classList.toggle("show");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.toggle("show");
  }
});
