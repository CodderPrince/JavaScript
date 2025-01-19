// Function to create a ghost cursor element at the mouse position
function createGhostCursor(x, y) {
  // Create a new ghost element
  const ghostCursor = document.createElement('div');
  ghostCursor.classList.add('ghost-cursor');

  // Set the initial position of the ghost cursor
  ghostCursor.style.left = `${x}px`;
  ghostCursor.style.top = `${y}px`;

  // Random color for each ghost
  ghostCursor.style.backgroundColor = getRandomColor();

  // Append the ghost cursor to the body
  document.body.appendChild(ghostCursor);

  // Make the ghost element disappear after 500ms (fade effect)
  setTimeout(() => {
      ghostCursor.style.opacity = '0';
  }, 100);

  // Remove the ghost element after animation completes to avoid memory leak
  setTimeout(() => {
      ghostCursor.remove();
  }, 600);  // The total time to wait before removing the ghost
}

// Random color generator for the ghost cursor
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Track mouse movement and create ghost cursors at each position
document.addEventListener("mousemove", (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  // Create a new ghost cursor at the current mouse position
  createGhostCursor(mouseX, mouseY);
});
