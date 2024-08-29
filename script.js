document.body.setAttribute(
  `style`,
  `display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;`,
);

const GRIDS = 16;
const BLACK = "rgb(0, 0, 0)"; // Note: When comparing strings, you'll need the space after the comma...
const WHITE = "rgb(255, 255, 255)";
const CELL_SIZE = 500;
let pencil = "rainbow";
let grid_size = GRIDS;

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
        border: 1px solid rgba(0, 0, 0, .1);
        background-color: ${WHITE};
        opacity = 1;
        box-sizing: border-box;
        `,
      );

      column.append(pixel);
    }
    parent.appendChild(column);
  }
}
createGrid(container, GRIDS);

function getRngRGB() {
  return Math.floor(Math.random() * 255);
}

function colorPixels(e) {
  if (!e.target.className.includes("pixel")) return;

  let target = e.target;
  let pixelColor = target.style.backgroundColor;

  if (pencil == "monochrome-legacy") {
    if (pixelColor == BLACK) {
      e.target.style.backgroundColor = WHITE;
    } else {
      e.target.style.backgroundColor = BLACK;
    }
  } else if (pencil == "monochrome") {
    e.target.style.backgroundColor = BLACK;
    e.target.style.opacity =
      e.target.style.opacity < 1 ? +e.target.style.opacity + 0.1 : 1;
  } else if (pencil == "rainbow") {
    e.target.style.backgroundColor = `rgb(${getRngRGB()}, ${getRngRGB()}, ${getRngRGB()})`;
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
    grid_size = newSize;
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
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  createGrid(container, grid_size);
}
clear_btn.addEventListener("click", clearGrid);
document.body.append(clear_btn);

const pen_container = document.createElement("div");
pen_container.setAttribute(
  `style`,
  `display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;`,
);
function getClickedButton(e) {
  const targ = e.target;

  if (typeof targ.className != "string" || targ.className == "") return;
  pencil = targ.className;
}
pen_container.addEventListener("click", getClickedButton);
document.body.append(pen_container);

const monochrome_pen = document.createElement("button");
monochrome_pen.setAttribute(
  `style`,
  `padding: 1rem;
  margin: 1rem;
  border: 1px solid rgba(0,0,0,.5);
  background-image: linear-gradient(black, white);
  font-size: 15px;
  font-weight: bold;
  color: rgb(255,255,255);`,
);
monochrome_pen.textContent = "Monochrome pen";
monochrome_pen.className = "monochrome";
pen_container.append(monochrome_pen);

const legacy_pen = document.createElement("button");
legacy_pen.setAttribute(
  `style`,
  `padding: 1rem;
  margin: 1rem;
  font-size: 15px;
  font-weight: bold;`,
);
legacy_pen.textContent = "Normal pen";
legacy_pen.className = "monochrome-legacy";
pen_container.append(legacy_pen);

const rainbow_pen = document.createElement("button");
rainbow_pen.setAttribute(
  `style`,
  `padding: 1rem;
  margin: 1rem;
  border: 1px solid rgba(0,0,0,.5);
  background-image: linear-gradient(red, orange, yellow, green, cyan, blue, purple);
  font-size: 15px;
  font-weight: bold;
  color: rgb(255,255,255);`,
);
rainbow_pen.textContent = "Rainbow pen";
rainbow_pen.className = "rainbow";
pen_container.append(rainbow_pen);
