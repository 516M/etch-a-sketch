let container = document.querySelector(".container");

container.style.display = "flex";
container.style.flexFlow = "row";
container.style.justifyContent = "center";
container.style.margin = "3rem";
container.style.padding = "4rem";
container.style.border = "1px solid black";

function createGrid(parent, size) {
  if (!parent) return;
  if (size <= 0) return;

  for (let i = 0; i < size; i++) {
    let column = document.createElement("div");
    column.className = "column" + i;

    for (let j = 0; j < size; j++) {
      let pixel = document.createElement("div");
      pixel.className = "pixel-item" + i + "-" + j;
      pixel.style.flex = "1 1 1em";
      pixel.style.width = "16px";
      pixel.style.height = "16px";
      pixel.style.border = "1px solid black";
      pixel.style.backgroundColor = "white";
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
btn.style.padding = "1rem";
btn.style.margin = "1.2rem";

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
