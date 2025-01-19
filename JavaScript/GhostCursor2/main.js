// Set up canvas and context
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Resize canvas to fill the entire window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Mouse position and ghost trail array
let mouseX = 0, mouseY = 0;
let trail = [];

// Update mouse position and store the trail
function updateMousePosition(x, y) {
  mouseX = x;
  mouseY = y;

  // Store the mouse position with an alpha value
  trail.push({ x: mouseX, y: mouseY, alpha: 1.0 });

  // Limit the trail length (remove the oldest item)
  if (trail.length > 15) { // Adjust this for more/less trailing dots
    trail.shift();
  }
}

// Draw the ghost cursor (trail effect)
function drawGhostCursor() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Loop through the trail array and draw the cursor trail
  for (let i = 0; i < trail.length; i++) {
    let trailDot = trail[i];
    ctx.beginPath();
    ctx.arc(trailDot.x, trailDot.y, 15 - i, 0, Math.PI * 2); // Gradual decreasing size
    ctx.fillStyle = `rgba(255, 0, 0, ${trailDot.alpha})`; // Red color with fading effect
    ctx.fill();

    // Gradually fade the alpha value (transparency)
    trailDot.alpha *= 0.95; // Fade out the trail with each frame
  }
}

// Main render loop
function render() {
  drawGhostCursor();
  requestAnimationFrame(render); // Request the next frame for smooth animation
}

// Event listeners for mouse movement and window resize
window.addEventListener("mousemove", (e) => {
  updateMousePosition(e.clientX, e.clientY);
});

window.addEventListener("resize", resizeCanvas);

// Initialize canvas and start the render loop
resizeCanvas();
render();
