const canvas = document.getElementById("canvas");
const body = document.querySelector("body");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let points = [];
var theColor = "";
var lineW = 5;
let prevX = null;
let prevY = null;
let draw = false;

body.style.backgroundColor = "#FFFFFF";
var theInput = document.getElementById("favcolor");

theInput.addEventListener(
  "input",
  function () {
    theColor = theInput.value;
    body.style.backgroundColor = theColor;
  },
  false
);

const ctx = canvas.getContext("2d");
ctx.lineWidth = lineW;
ctx.lineJoin = "round";
ctx.lineCap = "round";

document.getElementById("ageInputId").oninput = function () {
  draw = null;
  lineW = document.getElementById("ageInputId").value;
  document.getElementById("ageOutputId").innerHTML = lineW;
  ctx.lineWidth = lineW;
};

let clrs = document.querySelectorAll(".clr");
clrs = Array.from(clrs);
clrs.forEach((clr) => {
  clr.addEventListener("click", () => {
    ctx.strokeStyle = clr.dataset.clr;
  });
});

window.addEventListener("mousedown", (e) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  points = [];
  //   //reset điểm vẽ
  draw = true;
  prevX = e.clientX;
  prevY = e.clientY;
});

window.addEventListener("mouseup", () => {
  draw = false;
  prevX = null;
  prevY = null;
  console.log(points);
});

window.addEventListener("mousemove", (e) => {
  if (!draw) return;

  const currentX = e.clientX;
  const currentY = e.clientY;
  points.push({ x: currentX, y: currentY });
  ctx.beginPath();
  ctx.moveTo(prevX, prevY);

  // Vẽ một đường thẳng từ điểm trước đến điểm hiện tại
  ctx.lineTo(currentX, currentY);
  ctx.stroke();

  // Cập nhật tọa độ để tiếp tục vẽ
  prevX = currentX;
  prevY = currentY;
});
