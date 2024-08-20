let container = document.querySelector(".container");

container.style.display = "flex";
container.style.border = "1px solid black";

function createAndAppendPixel(parent, index) {
  let idx = Number.isInteger(index) ? index : "";
  let pixel = document.createElement("div");

  pixel.className = "pixel" + idx;
  pixel.style.flex = "1 1 1em";
  pixel.style.width = "16px";
  pixel.style.height = "16px";
  pixel.style.border = "1px solid black";
  pixel.style.backgroundColor = "white";

  if (parent) {
    parent.append(pixel);
  }
}

const GRIDS = 16;
for (let i = 0; i < GRIDS; i++) {
  createAndAppendPixel(container, i);
}

function colorPixels(e) {
  let target = e.target;
  let pixelColor = target.style.backgroundColor;

  if (pixelColor == "black") {
    e.target.style.backgroundColor = "white";
  } else {
    e.target.style.backgroundColor = "black";
  }
}
container.addEventListener("mouseover", colorPixels);
