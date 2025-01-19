// Get the canvas element and set up the 2D drawing context
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

// Adjust canvas size to fill the screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Utility functions for handling the mouse position
let mouseX = 0, mouseY = 0;
let ghostCursorTrail = [];

function updateMousePosition(x, y) {
  mouseX = x;
  mouseY = y;
  // Store positions for the trail effect
  ghostCursorTrail.push({ x: mouseX, y: mouseY, alpha: 1.0 });
  if (ghostCursorTrail.length > 20) { // Limit trail length
    ghostCursorTrail.shift(); // Remove the oldest cursor position from the trail
  }
}

// Draw the ghost cursor on the canvas
function drawGhostCursor() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Loop through the ghost cursor trail array and draw each trail dot
  for (let i = 0; i < ghostCursorTrail.length; i++) {
    let trail = ghostCursorTrail[i];
    ctx.beginPath();
    ctx.arc(trail.x, trail.y, 10, 0, 2 * Math.PI); // Draw a circle at the trail position
    ctx.fillStyle = `rgba(255, 0, 0, ${trail.alpha})`; // Red color with fading effect
    ctx.fill();
    trail.alpha *= 0.9; // Gradually decrease the alpha (fade effect)
  }
}

// The main render loop
function render() {
  drawGhostCursor();
  requestAnimationFrame(render); // Request the next frame
}

// Event listeners for mouse movement
window.addEventListener("mousemove", (e) => {
  updateMousePosition(e.clientX, e.clientY);
});

// Resize the canvas when the window is resized
window.addEventListener("resize", resizeCanvas);

// Initialize the canvas size and start the rendering loop
resizeCanvas();
render();
