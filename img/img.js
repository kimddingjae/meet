const img = document.querySelector("img");
const x = document.querySelector(".x");
const h2 = document.querySelector("h2");

x.addEventListener("click", () => {
  window.parent.postMessage("x", "*"); // 메시지 전송
});

if (localStorage.getItem("result")) {
  var result = localStorage.getItem("result");
  img.src = "./" + result + ".jpg";
  h2.innerHTML = result;
  h2.classList.toggle("show");
  localStorage.removeItem("result");
  window.parent.postMessage("xx", "*"); // 메시지 전송
}
