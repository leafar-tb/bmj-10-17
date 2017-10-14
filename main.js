const SCALE = 4
const STREET_IMAGE = document.getElementById("road")

let Car = {
    onTrack: 0,
    state: "normal", //jump, down, side, normal
    lives: 10
}

let Track = {
    size: SCALE* STREET_IMAGE.height,
    distance: this.size * 2
}

const TRACKS = 2;
function getTrackY(trackId) {
    return (trackId+1) / (TRACKS+1);
}


var TYPES = ["obstacleGround", "obstacleWall", "obstacleUpBar"]; //obstacle types

class Obstacle {
    constructor(track, type, size) {
        this.track = track;
        this.type = type;
        this.size = size;
        this.xPosition = 1.1;
        this.yPosition = getTrackY(track);
    }

    draw() {
        var img = document.getElementById(this.type);
        draw.drawImage(img, this.xPosition * canvas.width, (this.yPosition *canvas.height)-(Track.size/2), this.size, this.size);
    }
}

const canvas = document.getElementById("gameCanvas")
const draw = canvas.getContext("2d");
var running = true;

const obstaclesCanvas = document.getElementById("obstaclesCanvas").getContext("2d");

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
    addObstacle();
}

function drawCar() {
    // TODO: implement
}

async function mainloop () {
    // frame rate housekeeping
    let timeStartFrame = new Date().getTime();

    // clear screen
    draw.clearRect(0, 0, 600, 600);

    // do stuff
    addObstacle();

    // render tracks, car, obstacles
    drawStreet();
    drawObstacles();
    drawCar();

}

window.setInterval(mainloop, 30);

function addObstacle() {
    // TODO make sure obstacles are not too near to each other - add big enough margin
  var track = Math.floor(Math.random() * (TRACKS)) +1;
  var type = Math.floor(Math.random() * 2);
  var size = 64;//TODO randomize?

  var obstacle = new Obstacle(track, TYPES[type], size);
  obstacle.draw();
}
