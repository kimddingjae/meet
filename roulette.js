const $c = document.querySelector("canvas");
const ctx = $c.getContext(`2d`);
const main = document.querySelector("#main");
const body = document.querySelector("body");
const modal = document.querySelector(".modal");
const link = document.querySelector(".link");
const x = document.querySelector(".x");
let result = "";
let cnt = 0;

const product = [
  "도오",
  "명재",
  "희준",
  "종인",
  "창환",
  "승현",
  "재권",
  "준승",
  "선규",
];

let chkArr = [];

const colors = [
  "#dc0936",
  "#e6471d",
  "#f7a416",
  "#efe61f ",
  "#60b236",
  "#209b6c",
  "#169ed8",
  "#3f297e",
  "#87207b",
  "#be107f",
  "#e7167b",
];

x.addEventListener("click", () => {
  modal.classList.toggle("show");
  body.style.overflow = "auto";
});

const showImg = () => {
  window.href = "https://kimddingjae.github.io/meet/img/" + result + ".jpg";
  // $(".link").attr("src", "./img/" + result + ".jpg");

  // modal.classList.toggle("show");
  // if (modal.classList.contains("show")) {
  //   body.style.overflow = "hidden";
  // }
};

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.toggle("show");
    if (!modal.classList.contains("show")) {
      body.style.overflow = "auto";
    }
  }
});

const makeChk = () => {
  var br = "";
  for (var value of product) {
    if (cnt == 4) br = "</br>";
    else br = "";
    $("#chk")
      .append(
        `<input type="checkbox" id="${value}" name="chk" checked=true value="${value}">`
      )
      .append(`<label for="${value}">${value}</label></div>` + br);
    cnt++;
  }
};

const newMake = () => {
  chkArr = [];
  $("input[name=chk]:checked").each(function (i) {
    chkArr.push($(this).val());
  });

  const [cw, ch] = [$c.width / 2, $c.height / 2];
  const arc = Math.PI / (chkArr.length / 2);

  for (let i = 0; i < chkArr.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = colors[i % (colors.length - 1)];
    ctx.moveTo(cw, ch);
    ctx.arc(cw, ch, cw, arc * (i - 1), arc * i);
    ctx.fill();
    ctx.closePath();
  }

  ctx.fillStyle = "#fff";
  ctx.font = "18px Pretendard";
  ctx.textAlign = "center";

  for (let i = 0; i < chkArr.length; i++) {
    const angle = arc * i + arc / 2;

    ctx.save();

    ctx.translate(
      cw + Math.cos(angle) * (cw - 43),
      ch + Math.sin(angle) * (ch - 43)
    );

    ctx.rotate(angle + Math.PI / 2);

    chkArr[i].split(" ").forEach((text, j) => {
      ctx.fillText(text, 0, 30 * j);
    });

    ctx.restore();
  }
};

const rotate = () => {
  $c.style.transform = `initial`;
  $c.style.transition = `initial`;

  setTimeout(() => {
    const ran = Math.floor(Math.random() * chkArr.length);

    const arc = 360 / chkArr.length;
    const rotate = ran * arc + 3600 + arc * 3 - arc / 4;

    $c.style.transform = `rotate(-${rotate}deg)`;
    $c.style.transition = `2s`;
    console.log(chkArr[ran]);
    result = chkArr[ran];
    setTimeout(() => showImg(), 2000);
  }, 1);
};

makeChk();
newMake();
