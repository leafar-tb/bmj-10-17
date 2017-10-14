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
