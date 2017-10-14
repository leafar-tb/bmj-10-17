var Car = {
  onTrack = 0,
  state = "normal", //jump, down, side, normal
  lives = 10;
}

var Track = {
  size = 10
}

var TRACKS = 2;

class Obstacle {
  constructor(track, type, size) {
    this.track = track;
    this.type = type;
    this.size = size;
    this.xPosition = 1.1;
    this.yPosition = (track+1) / (TRACKS+1);
  }
}

var stage = document.getElementByID("stage");
var canvas = document.createElement("canvas");
canvas.setAttribute("width", 600);
canvas.setAttribute("height", 600);
stage.appendChild(canvas);
var drawingSurface = canvas.getContext("2d");
