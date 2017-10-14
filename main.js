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
const FRAME_MILIS = 30
const TYPES = ["obstacleGround", "obstacleWall", "obstacleUpBar"]; //obstacle types

//global pool
var OBSTACLES = []

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
        draw.drawImage(img, this.track*Track.size, this.track*Track.size, this.size, this.size);
    }
    
    move() {
        this.xPosition -= (FRAME_MILIS/1000) / 8;
    }
}

function addObstacle() {
  var track = Math.floor(Math.random() * (TRACKS)) +1;
  var type = Math.floor(Math.random() * TYPES.length);
  var size = 16;//TODO randomize?

  var obstacle = new Obstacle(track, TYPES[type], size);
  OBSTACLES.push(obstacle);
}

function moveObstacles() {
    for(obst of OBSTACLES){
        obst.move();
    }
}

const canvas = document.getElementById("gameCanvas")
const draw = canvas.getContext("2d");
var running = true;

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
    for(obst of OBSTACLES){
        obst.draw();
    }
}

function drawCar() {
    // TODO: implement
}

async function mainloop () {
    // frame rate housekeeping
    let timeStartFrame = new Date().getTime();

    moveObstacles();
    // spawn obstacle approx every 20 frames
    if( Math.random() < 1/20 ){
        addObstacle();
    }

    // clear screen
    draw.clearRect(0, 0, 600, 600);
    
    // render tracks, car, obstacles
    drawStreet();
    drawObstacles();
    drawCar();
}

window.setInterval(mainloop, FRAME_MILIS);
