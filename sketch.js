const vidDensity = "Ñ@#W$9876543210?!abc;:+=-,._                    ";
const density = "Ñ@#W$9876543210?!abc;:+=-,._ ";
const scaleRatio = 10;
let myFont, img, w, h, video, asciiDiv;

function preload() {
  myFont = loadFont("fonts/FiraCode-Light.ttf");
  img = loadImage("images/smallPixelFrog2.png");
}

function drawAvgToSquare(r, g, b, avg, x, y) {
  fill(r, g, b);
  rectMode(CENTER);
  square(x * w, y * w, (w * avg) / 255);
}

function drawASCII(r, g, b, avg, x, y) {
  const len = density.length;
  const charIndex = floor(map(avg, 0, 255, len, 0));

  noStroke();
  fill(avg);
  textFont(myFont);
  textSize(w);
  textAlign(CENTER, CENTER);
  text(density[charIndex], x * w + w * 0.5, y * h + h * 0.5);
}

function drawHtmlASCII() {
  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    let row = "";
    for (let x = 0; x < img.width; x++) {
      const pixelIndex = (x + y * img.width) * 4;
      const r = img.pixels[pixelIndex + 0];
      const g = img.pixels[pixelIndex + 1];
      const b = img.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;

      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, len, 0));
      if (density[charIndex] == " ") row += "&nbsp";
      else row += density[charIndex];
    }
    createDiv(row);
  }
  noLoop();
}

function canvasDrawing() {
  // image(img, 0, 0, width, height);
  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      const pixelIndex = (x + y * img.width) * 4;
      const r = img.pixels[pixelIndex + 0];
      const g = img.pixels[pixelIndex + 1];
      const b = img.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;

      drawAvgToSquare(r, g, b, avg, x, y);
      // drawASCII(r, g, b, avg, x, y);
    }
  }
  noLoop();
}

function videoASCII() {
  video.loadPixels();
  let asciiImage = "";
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = vidDensity.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));
      const c = vidDensity.charAt(charIndex);
      if (c == " ") asciiImage += "&nbsp;";
      else asciiImage += c;
    }
    asciiImage += "<br/>";
  }
  asciiDiv.html(asciiImage);
}

function videoSquares() {
  video.loadPixels();
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      const pixelIndex = (x + y * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const a = video.pixels[pixelIndex + 3];
      const avg = (r + g + b) / 3;
      // const charIndex = floor(map(avg, 0, 255, 0, len));
      // const c = vidDensity.charAt(cha,rIndex);

      fill(r, g, b);
      rectMode(CENTER);
      square(x * w, y * w, (w * avg) / 255);
    }
  }
}

function vidLoad() {
  video.loop();
  video.volume(0);
}

function setup() {
  // noCanvas();
  video = createCapture(VIDEO); // for webcam
  // video = createVideo("videos/drifting.mp4", vidLoad);
  video.size(100, 75);
  asciiDiv = createDiv();

  createCanvas(video.width * 9, video.height * 9); // for video
  // createCanvas(img.width * scaleRatio, img.height * scaleRatio); // for image
  w = width / img.width;
  h = height / img.height;
}

function draw() {
  background(0);

  videoSquares();
  //videoASCII();
  //canvasDrawing();
  //drawHtmlASCII();
}
