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

async function mainloop () {
    while(running) {
        // frame rate housekeeping
        let timeStartFrame = new Date().getTime();
        let deltaTime = timeStartFrame - lastLoop;
        lastLoop = timeStartFrame;
        
        // wait for next frame
        await waitForTime(timeStartFrame, 30);
    }
}

mainloop();
