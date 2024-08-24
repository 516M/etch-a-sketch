document.body.setAttribute(
  `style`,
  `display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;`,
);

const CELL_SIZE = 500;
let container = document.querySelector(".container");
container.setAttribute(
  `style`,
  `display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  padding: 4rem;
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  border: 1px solid black;`,
);

function createGrid(parent, size) {
  if (!parent) return;
  if (size <= 0) return;

  for (let i = 0; i < size; i++) {
    let column = document.createElement("div");
    column.className = "column" + i;

    for (let j = 0; j < size; j++) {
      let pixel = document.createElement("div");
      pixel.className = "pixel-item" + i + "-" + j;
      pixel.setAttribute(
        `style`,
        `width: ${CELL_SIZE / size}px;
        height: ${CELL_SIZE / size}px;
        border: 1px solid black;
        background-color: white;
        box-sizing: border-box;
        `,
      );

      column.append(pixel);
    }
    parent.appendChild(column);
  }
}
const GRIDS = 16;
createGrid(container, GRIDS);

function colorPixels(e) {
  let target = e.target;
  let pixelColor = target.style.backgroundColor;

  if (!e.target.className.includes("pixel")) return;
  if (pixelColor == "black") {
    e.target.style.backgroundColor = "white";
  } else {
    e.target.style.backgroundColor = "black";
  }
}
container.addEventListener("mouseover", colorPixels);

const btn = document.createElement("button");
btn.textContent = "New Grid";
btn.setAttribute(
  `style`,
  `padding: 1rem;
  margin: 1rem;`,
);

function createGridFromClick(e) {
  let newSize = +prompt("Enter new grid size:");
  if (typeof newSize != "number") return;
  if (newSize <= 0) newSize = 1;

  if (newSize > 100) {
    alert("Can't assign a grid size larger than 100!");
  } else {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    createGrid(container, newSize);
  }
}
btn.addEventListener("click", createGridFromClick);
document.body.prepend(btn);

const clear_btn = document.createElement("button");
clear_btn.textContent = "Clear grid";
clear_btn.setAttribute(
  `style`,
  `padding: 1rem;
  margin: 1rem;`,
);

function clearGrid(e) {
  const pixels = document.querySelectorAll(`[class*="pixel-item"]`);
  for (let i = 0; i < pixels.length; i++) {
    pixels[i].style.backgroundColor = "white";
  }
}
clear_btn.addEventListener("click", clearGrid);
document.body.append(clear_btn);
