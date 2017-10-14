let Car = {
    onTrack: 0,
    state: "normal", //jump, down, side, normal
    lives: 10,
    imgs: [
        document.getElementById("car1"),
        document.getElementById("car2")
    ],
    imgDimension: {
        width: 50,
        height: 25
    },
    bobLoop: 0
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

class ObstacleType {
    constructor(image, size, evadeState) {
        this.image = document.getElementById(image);
        this.size = size;
        this.evadeState = evadeState;
    }
}

//TODO set proper sizes 
const TYPES = [
    new ObstacleType("obstacleGround", 16, "jump"),
    new ObstacleType("obstacleUpBar", 16, "down"),
    new ObstacleType("obstacleWall", 16, null)
]

//global pool
var OBSTACLES = []

class Obstacle {
    constructor(track, type) {
        this.track = track;
        this.type = type;
        this.xPosition = 1.1;
        this.yPosition = getTrackY(track);
    }

    draw() {
        var img = this.type.image;
        draw.drawImage(img, this.track*Track.size, this.track*Track.size, this.size, this.size);
    }
    
    move() {
        this.xPosition -= (FRAME_MILIS/1000) / 8;
    }
    
    collidesWithCar() {
        if(this.track != Car.onTrack)
            return false;
        if(this.type.evadeState == Car.state)
            return false;
        if(this.xPosition < .1) //TODO adapt to obstacle+car dimension
            return true;
        return false;
    }
}

function addObstacle() {
  var track = Math.floor(Math.random() * (TRACKS)) +1;
  var type = Math.floor(Math.random() * TYPES.length);
  OBSTACLES.push(new Obstacle(track, TYPES[type]));
}

function moveObstacles() {
    for(obst of OBSTACLES){
        obst.move();
    }
}

function isCarCrashed() {
    for(obst of OBSTACLES) {
        if(obst.collidesWithCar())
            return true;
    }
    return false;
}

const canvas = document.getElementById("gameCanvas")
const draw = canvas.getContext("2d");
var running = true;

function handleLaneChange(event) {
    if(event.key == 'w') {
        Car.onTrack = Math.max(0, Car.onTrack-1);
    } else if(event.key == 's') {
        Car.onTrack = Math.min(Car.onTrack+1, TRACKS-1);
    }
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
        let imgX = - SCALE* STREET_IMAGE.width/2;
        let imgY = getTrackY(track) * canvas.height - SCALE* STREET_IMAGE.height/2;
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
    let imgIndex;
    if(Car.bobLoop % 10 < 5) {
        imgIndex = 0;
    } else {
        imgIndex = 1;
    }
    draw.drawImage(Car.imgs[imgIndex], 10*SCALE, getTrackY(Car.onTrack)*canvas.height - SCALE * (Car.imgDimension.height + 12)/2, SCALE * Car.imgDimension.width, SCALE * Car.imgDimension.height);
    Car.bobLoop++;
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
    
    if(isCarCrashed()) {
        window.clearInterval(LOOP);
        draw.font="20px Georgia";
        draw.strokeText("Game Over!", 10, 50);
    }
}

const LOOP = window.setInterval(mainloop, FRAME_MILIS);
