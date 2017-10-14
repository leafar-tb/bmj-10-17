var Car = {
    onTrack: 0,
    state: "normal", //jump, down, side, normal
    lives: 10
}

var Track = {
    size: 64
}

var TRACKS = 2; //how many tracks we have

var TYPES = ["obstacleGround", "obstacleGround", "obstacleGround"]; //obstacle types

class Obstacle {
    constructor(track, type, size) {
        this.track = track;
        this.type = type;
        this.size = size;
        this.xPosition = 1.1;
        this.yPosition = (track+1) / (TRACKS+1);
    }

    draw() {
      img = new Image();
      img.src = 'images/' + this.type + '.png';
      img.onload = function(){
        draw.drawImage(img, this.track*Track.size, this.track*Track.size, this.size, this.size);
      }
    }
}

const draw = document.getElementById("gameCanvas").getContext("2d");
var running = true;
var lastLoop = new Date().getTime();

function waitForTime(timeStartFrame, frameTime) {
    let timeNow = new Date().getTime();
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, frameTime - (timeNow - timeStartFrame));
    });
}

function handleLaneChange(event) {
    // TODO: implement
}

function handleJump(event) {
    // TODO: implement
}
const handlers = [handleLaneChange, handleJump];
// handle input events
document.addEventListener('keydown', (event) => {
    for (handler in handlers) {
        handler(event);
    }
});

async function mainloop () {
    while(running) {
      // frame rate housekeeping
      let timeStartFrame = new Date().getTime();
      let deltaTime = timeStartFrame - lastLoop;
      lastLoop = timeStartFrame;

      // do stuff
      // render tracks, car, obstacles
      addObstacle();
      var currentTime = new Date().getTime();
      lastLoop = deltaTime;
      // clear screen
      draw.clearRect(-10, -10, 700, 700);

      // wait for next frame
      await waitForTime(timeStartFrame, 30);
    }
}

function addObstacle() {
  var track = Math.floor(Math.random() * (TRACKS)) +1;
  var type = Math.floor(Math.random() * 2);
  var size = 16;//TODO randomize?

  var obstacle = new Obstacle(track, TYPES[type], size);
  obstacle.draw();
}

mainloop();
