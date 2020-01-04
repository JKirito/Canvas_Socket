const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");
const socket = io("http://localhost:3000");

function setCanvasSize(height, width) {
  ctx.canvas.width = width;
  ctx.canvas.height = height;
}
setCanvasSize(window.innerHeight, window.innerWidth);
window.onresize = () => {
  setCanvasSize(window.innerHeight, window.innerWidth);
};

// ctx.beginPath();
// ctx.moveTo(40, 40);
// ctx.lineTo(200, 200);
// ctx.stroke();
ctx.lineWidth = 10;
let colorA = Math.floor(Math.random() * 255);
let colorB = Math.floor(Math.random() * 255);
let colorC = Math.floor(Math.random() * 255);
const color = `rgb(${colorA},${colorB},${colorC})`;
ctx.strokeStyle = color;
ctx.lineCap = "round";

let shouldDraw = false;

canvas.addEventListener("mousedown", () => {
  shouldDraw = true;
  ctx.beginPath();
});
canvas.addEventListener("mouseup", () => {
  shouldDraw = false;
  socket.emit("begin");
});
canvas.addEventListener("mousemove", e => {
  if (shouldDraw) {
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    socket.emit("draw", { X: e.clientX, Y: e.clientY, color: color });
  }
});

socket.on("draw", drawData => {
  ctx.strokeStyle = drawData.color;
  ctx.lineTo(drawData.X, drawData.Y);
  ctx.stroke();
  // console.log(drawData.X, drawData.Y);
});
socket.on("begin", () => {
  ctx.beginPath();
});
