var Car = {
    onTrack: 0,
    state: "normal", //jump, down, side, normal
    lives: 10
}

var Track = {
    size: 10
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
    for (handler of handlers) {
        handler(event);
    }
});

function drawStreet() {
    // TODO: implement
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

        // clear screen
        draw.clearRect(-10, -10, 700, 700);

        drawStreet();
        drawObstacles();
        drawCar();
        
        // wait for next frame
        await waitForTime(timeStartFrame, 30);
    }
}

mainloop();
