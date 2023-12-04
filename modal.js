const body = document.querySelector("body");
const modal = document.querySelector(".modal");
const x = document.querySelector(".x");
const btnOpenPopup = document.querySelector(".btn-open-popup");

function close(){
  modal.classList.toggle("show");

  if (modal.classList.contains("show")) {
    body.style.overflow = "hidden";
  }
}

btnOpenPopup.addEventListener("click", () => {
  modal.classList.toggle("show");

  if (modal.classList.contains("show")) {
    body.style.overflow = "hidden";
  }
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.toggle("show");

    if (!modal.classList.contains("show")) {
      body.style.overflow = "auto";
    }
  }
});
