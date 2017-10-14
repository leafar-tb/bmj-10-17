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

var gameCanvas = document.getElementById("gameCanvas");
var draw = gameCanvas.getContext("2d");
var running = true;
var lastLoop = new Date().getTime();

function waitForTime(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

async function mainloop () {
    while(running) {
        // do stuff
        var currentTime = new Date().getTime();
        var deltaTime = currentTime - lastLoop;
        lastLoop = deltaTime;

        // wait for next frame
        await waitForTime(30);
    }
}

mainloop();
