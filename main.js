let Car = {
    onTrack: 0,
    state: "normal", //jump, down, side, normal
    lives: 10
}

let Track = {
    size: 64
}

const TRACKS = 2;
function getTrackY(trackId) {
    return (trackId+1) / (TRACKS+1);
}

const SCALE = 4

var TYPES = ["obstacleGround", "obstacleGround", "obstacleGround"]; //obstacle types

class Obstacle {
    constructor(track, type, size) {
        this.track = track;
        this.type = type;
        this.size = size;
        this.xPosition = 1.1;
        this.yPosition = getTrackY(track);
    }

    draw() {
      img = new Image();
      img.src = 'images/' + this.type + '.png';
      img.onload = function(){
        draw.drawImage(img, this.track*Track.size, this.track*Track.size, this.size, this.size);
      }
    }
}

const canvas = document.getElementById("gameCanvas")
const draw = canvas.getContext("2d");
var running = true;
var lastLoop = new Date().getTime();

async function waitForTime(timeStartFrame, frameTime) {
    let timeNow = new Date().getTime();
    await new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, Math.max(0, frameTime - (timeNow - timeStartFrame)));
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
    for (handler of handlers) {
        handler(event);
    }
});

const STREET_IMAGE = document.getElementById("road")
function drawStreet() {
	for (let track = 0; track < TRACKS; track++){
        var imgY = getTrackY(track) * canvas.height - SCALE* STREET_IMAGE.height/2;
        var imgX = - SCALE* STREET_IMAGE.width/2;
        while(imgX < canvas.width) {
            draw.drawImage(STREET_IMAGE, imgX, imgY, SCALE* STREET_IMAGE.width, SCALE* STREET_IMAGE.height);
            imgX = imgX + SCALE* STREET_IMAGE.width;
        }
	}
}

function drawObstacles() {
    // TODO: implement
}

function drawCar() {
    // TODO: implement
}

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

        // clear screen
        draw.clearRect(0, 0, 600, 600);

        drawStreet();
        drawObstacles();
        drawCar();

        // wait for next frame
        waitForTime(timeStartFrame, 30);
    }
}

function addObstacle() {
  var track = Math.floor(Math.random() * (TRACKS)) +1;
  var type = Math.floor(Math.random() * 2);
  var size = 16;//TODO randomize?

  var obstacle = new Obstacle(track, TYPES[type], size);
  obstacle.draw();
}
