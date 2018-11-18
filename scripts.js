const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
const canvasWrapper = document.querySelector('.canvas-wrapper');
const maxSizeSlider = document.querySelector('#maxSize');
const minSizeSlider = document.querySelector('#minSize');
const clearCanvas = document.querySelector('.clear-canvas-btn');
const maxSizeOutput = document.querySelector('#maxSizeValueDisplayId');

canvas.width = canvasWrapper.offsetWidth;
canvas.height = canvasWrapper.offsetHeight;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

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
  if (ctx.lineWidth >= +maxSizeSlider.value || ctx.lineWidth <= +minSizeSlider.value) {
    direction = !direction;
  }
  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
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