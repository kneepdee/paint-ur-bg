const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
const canvasWrapper = document.querySelector('.canvas-wrapper');
const maxSizeSlider = document.querySelector('#maxSize');
const minSizeSlider = document.querySelector('#minSize');
const clearCanvas = document.querySelector('.clear-canvas-btn');
const maxSizeOutput = document.querySelector('#maxSizeValueDisplayId');

// console.log('canvasWrapper width: ' + canvasWrapper.offsetWidth);
// console.log('canvasWrapper height: ' + canvasWrapper.offsetHeight);

// console.log('knobs width: ' + knobs.clientWidth);
// console.log('knobs height: ' + knobs.clientHeight);

canvas.width = canvasWrapper.offsetWidth;
canvas.height = canvasWrapper.offsetHeight;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
// ctx.lineWidth = +minSizeSlider.value + 1;
// ctx.globalCompositeOperation = 'luminosity';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function draw(e) {
  if (!isDrawing) return; // stops the fn from running when they are not mouse
  // console.log(e.touches[0].clientX);
  hue = getRandomInt(360);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  if ('touches' in e) {
    ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY);
  } else {
    ctx.lineTo(e.offsetX, e.offsetY);
  }
  ctx.stroke();
  if ('touches' in e) {
    [lastX, lastY] = [e.touches[0].clientX, e.touches[0].clientY];
  } else {
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }
  // hue > 360 ? hue = 0 : hue;
  // console.log(hue);

  // if (+minSizeSlider.value === +maxSizeSlider.value) {
  //   ctx.lineWidth = +minSizeSlider.value;
  // }
  if (ctx.lineWidth >= +maxSizeSlider.value || ctx.lineWidth <= +minSizeSlider.value) {
    direction = !direction;
  }

  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }

  console.log(direction);
  console.log(ctx.lineWidth);
  direction === true ? ctx.lineWidth++ : ctx.lineWidth--;
  // if (ctx.lineWidth === +maxSizeSlider.value || ctx.lineWidth === ++minSizeSlider.valueSizeSlider.value) {
  //     direction = !direction;
  // }
  // console.log(direction);

  // direction === true ? ctx.lineWidth++ : ctx.lineWidth--;

  // start from
  // go to



}

// touch events

canvas.addEventListener('touchstart', (e) => {
  isDrawing = true;
  if (+maxSizeSlider.value < +minSizeSlider.value) {
    maxSizeSlider.value = +minSizeSlider.value
    maxSizeOutput.innerHTML = minSizeSlider.value;
  }
  ctx.lineWidth = +minSizeSlider.value + 1;
  if ('touches' in e) {
    [lastX, lastY] = [e.touches[0].clientX, e.touches[0].clientY];
  } else {
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }
});

canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

// mouse events

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  console.log('mousedown');
  if (+maxSizeSlider.value < +minSizeSlider.value) {
    maxSizeSlider.value = +minSizeSlider.value
    maxSizeOutput.innerHTML = minSizeSlider.value;
  }
  ctx.lineWidth = +minSizeSlider.value + 1;
  [lastX, lastY] = [e.offsetX, e.offsetY]; // destructuring
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

// reset canvas

const resetCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

clearCanvas.addEventListener('click', resetCanvas);

// Prevent scrolling when touching the canvas
document.body.addEventListener('touchstart', (e) => {
  if (e.target === canvas) {
    e.preventDefault();
  }
}, false);
document.body.addEventListener('touchend', (e) => {
  if (e.target === canvas) {
    e.preventDefault();
  }
}, false);
document.body.addEventListener('touchmove', (e) => {
  if (e.target === canvas) {
    e.preventDefault();
  }
}, false);


// positioning div element;

// const body = document.querySelector('body');
// const bodyHeight = body.clientHeight;

// const textDiv = document.querySelector('.title');
// const textDivHeight = textDiv.clientHeight;

// console.log(bodyHeight);

// console.log(textDivHeight);

// const margin = (bodyHeight - textDivHeight * 7) / 2;

// console.log(margin);

// textDiv.style.marginTop = `${margin}px`;