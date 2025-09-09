const container = document.getElementById("container");
const resetBtn = document.getElementById("resetBtn");

let gridSize = 16;

function createGrid(size) {
  container.innerHTML = "";
  const squareSize = 960 / size;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    square.addEventListener("mouseenter", () => {
      square.style.backgroundColor = "black";
    });

    container.appendChild(square);
  }
}

resetBtn.addEventListener("click", () => {
  let newSize = parseInt(prompt("Enter new grid size (max 100):"), 10);
  if (Number.isNaN(newSize) || newSize < 1 || newSize > 100) {
    alert("Please enter a number between 1 and 100.");
    return;
  }
  gridSize = newSize;
  createGrid(gridSize);
});

createGrid(gridSize);