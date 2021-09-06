// Canvas control of canvas and button
const canvas = document.getElementById("canvas");
const button = document.getElementById("button");
const ctx = canvas.getContext("2d");

//Created 240 random lines using map and objects
let lines = Array(240)
  .fill()
  .map((u) => ({
    yaxis: Math.round(Math.random() * (50 - 20 + 1) + 20),
    height: Math.round(Math.random() * (125 - 50 + 1) + 50),
  }));

//maintaining a count to know whether play or pause button clicked
let count = 1;
//play and pause button event listoner
button.addEventListener("click", () => {
  if (count % 2 === 1) {
    start();
    button.style.backgroundImage =
      "url(https://image.flaticon.com/icons/png/512/61/61180.png)";
  } else {
    pause();
    button.style.backgroundImage =
      "url(https://www.pinclipart.com/picdir/middle/217-2172073_free-music-icons-play-button-icon-minimalist-clipart.png)";
  }
  count++;
});

//maintains an interval for which line currently belong
let interval;
function start() {
  let line = 0;
  interval = setInterval(() => {
    ctx.fillStyle = "#ff00cc";
    ctx.fillRect(line * 5, lines[line].yaxis, 3, lines[line].height);
    line++;
  }, 500);
}

//pause function - clearing interval
function pause() {
  clearInterval(interval);
}

//creating lines with background in shadow color
function createLines() {
  lines.map((item, i) => {
    //static tag lines
    if (i === 3 || i === 52 || i === 158 || i === 221) {
      ctx.fillStyle = "green";
      ctx.fillRect(i * 5, 0, 3, item.yaxis * 2);
      //static filler for tag names
      ctx.fillRect(i * 5 - 15, 0, 52, 15);
      ctx.fillStyle = "white";
      if (i === 3) {
        ctx.fillText("Introduction", 0, 10);
      } else if (i === 52) {
        ctx.fillText("Rapport", i * 5 - 15, 10);
      } else if (i === 158) {
        ctx.fillText("Maths", i * 5 - 15, 10);
      } else if (i === 221) {
        ctx.fillText("Referrals", i * 5 - 15, 10);
      }
      //lines
      ctx.fillStyle = "#63625e";
      ctx.fillRect(i * 5, item.yaxis, 3, item.height);
    } else {
      //lines
      ctx.fillStyle = "#63625e";
      ctx.fillRect(i * 5, item.yaxis, 3, item.height);
    }
  });
}
createLines();

//getting clicked line and going to that place
canvas.addEventListener("click", (event) => {
  let xaxis = event.clientX - canvas.offsetLeft;
  for (let i = 0; i < lines.length; i++) {
    if (xaxis >= i * 5 && xaxis <= i * 5 + 5) {
      createLines();
      ctx.fillStyle = "#ff00cc";
      for (let j = 0; j <= i; j++) {
        ctx.fillRect(j * 5, lines[j].yaxis, 3, lines[j].height);
      }
    }
  }
});
