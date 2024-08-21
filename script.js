let container = document.querySelector(".container");

container.style.display = "flex";
container.style.flexFlow = "row";
container.style.justifyContent = "center";
container.style.margin = "3rem";
container.style.padding = "4rem";
container.style.border = "1px solid black";

function createGrid(parent, size) {
  if (!parent) return;

  for (let i = 0; i < GRIDS; i++) {
    let column = document.createElement("div");
    column.className = "column" + i;

    for (let j = 0; j < GRIDS; j++) {
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
