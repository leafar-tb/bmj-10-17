const SCALE = 4
const STREET_IMAGE = document.getElementById("road")
const CAR_STATES = {
    NORMAL: 0,
    JUMP: 1,
    DOWN: 2,
    SIDE: 3
}

const carFlyTime = 2000;

let Car = {
    onTrack: 0,
    state: CAR_STATES.NORMAL,
    jumpingSince: 0,
    lives: 10,
    imgs: [
        document.getElementById("car1"),
        document.getElementById("car2")
    ],
    jumpImg: document.getElementById("carJump"),
    duckImg: document.getElementById("carDuck"),
    bobLoop: 0
}

let Track = {
    size: SCALE* STREET_IMAGE.height,
    distance: this.size * 2
}

const TRACKS = 2;
function getTrackY(trackId) {
    return (trackId+1) / (TRACKS+1);
}

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
    new ObstacleType("obstacleGround", 16, CAR_STATES.JUMP),
    new ObstacleType("obstacleUpBar", 16, CAR_STATES.DOWN),
    new ObstacleType("obstacleWall", 16, -1)
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
        draw.drawImage(img, this.xPosition * canvas.width, (this.yPosition *canvas.height)+(Track.size/2)-(img.height*SCALE), img.width*SCALE, img.height*SCALE);
    }

    move() {
        this.xPosition -= (FRAME_MILIS/1000) / 8;
    }

    collidesWithCar() {
        if(this.track != Car.onTrack)
            return false;
        if(this.type.evadeState == Car.state)
            return false;
        if(this.xPosition < .1 && this.xPosition > 0) //TODO adapt to obstacle+car dimension
            return true;
        return false;
    }
}

function addObstacle() {
  var track = Math.floor(Math.random() * (TRACKS));
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

const obstaclesCanvas = document.getElementById("obstaclesCanvas").getContext("2d");

function handleLaneChange(event) {
    switch(event.key) {
        case 'w':
            Car.onTrack = Math.max(0, Car.onTrack-1);
            break;
        case 's':
            Car.onTrack = Math.min(Car.onTrack+1, TRACKS-1);
            break;
    }
}

function handleJump(event) {
    if(Car.state == CAR_STATES.NORMAL & event.key == ' ') {
        Car.state = CAR_STATES.JUMP;
        Car.jumpingSince = new Date().getTime();
    }
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
        //TODO align speed with obstacles
        let imgX = (- SCALE* STREET_IMAGE.width - new Date().getTime()/10) % (SCALE*STREET_IMAGE.width);
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
    let img;
    if(Car.bobLoop % 10 < 5) {
        img = Car.imgs[0];
    } else {
        img = Car.imgs[1];
    }

    if(Car.state == CAR_STATES.JUMP) {
        img = Car.jumpImg;
    }

    const jumpElapsed = new Date().getTime() - Car.jumpingSince
    const jumpHeight = 7.5*(-Math.pow((carFlyTime - jumpElapsed)/500, 2) + STREET_IMAGE.height);
    const posX = 10*SCALE;
    const posY = getTrackY(Car.onTrack)*canvas.height - SCALE * (Car.imgs[0].height + 12)/2 - Math.max(0, jumpHeight);
    const scaleX = SCALE * Car.imgs[0].width;
    const scaleY = SCALE * Car.imgs[0].height;

    draw.drawImage(img, posX, posY, scaleX, scaleY);
    Car.bobLoop++;

    if(new Date().getTime() > Car.jumpingSince + carFlyTime*2) {
        Car.state = CAR_STATES.NORMAL;
    }
}

async function mainloop () {
    // frame rate housekeeping
    let timeStartFrame = new Date().getTime();

    moveObstacles();

    // clear screen
    draw.clearRect(0, 0, 600, 600);
    // render tracks, car, obstacles
    drawStreet();
    drawObstacles();
    drawCar();

    if(isCarCrashed()) {
        window.clearInterval(LOOP);
        window.clearInterval(SPAWN);
        draw.font="20px Georgia";
        draw.strokeText("Game Over!", 10, 50);
    }
}

const SPAWN = window.setInterval(addObstacle, 60*FRAME_MILIS);
const LOOP = window.setInterval(mainloop, FRAME_MILIS);
