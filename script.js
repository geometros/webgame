
const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
ctx.fillStyle = "#9FD9E3";
ctx.rect(0,0,canvas.width,canvas.height)
ctx.fill();
let spriteSheetLoc = "./pixel_boat_scaled_5x.png"
let image = new Image()
image.src = spriteSheetLoc;

const BOAT_SIZE = 32*5

let sourceX = 0;
let sourceY = 0;

function drawFrame() {

    ctx.fill();

    if (player.x > canvas.width - BOAT_SIZE) {
        player.x %= canvas.width
    }
    if (player.x < - BOAT_SIZE) {
        player.x += canvas.width
    }
    if (player.y > canvas.height - BOAT_SIZE) {
        player.y %= canvas.height
    }
    if (player.y < - BOAT_SIZE) {
        player.y += canvas.height
    }
    
    switch(player.direction) {
        case 0:
            sourceX = 0;
            sourceY = 0;
            break;
        case 1:
            sourceX = BOAT_SIZE + 1;
            sourceY = BOAT_SIZE + 1;
            break;
        case 2:
            sourceX = 0;
            sourceY = BOAT_SIZE + 1;
            break;
        case 3:
            sourceX = BOAT_SIZE + 1;
            sourceY = 0;
            break;
    }

    ctx.drawImage(
        image,
        sourceX,
        sourceY,
        BOAT_SIZE,
        BOAT_SIZE,
        player.x,
        player.y,
        BOAT_SIZE,
        BOAT_SIZE,
    ) 
}

const player = {
    x: 10,
    y: 10,
    movespeed: 5,
    direction: 0,
}

window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);

const keysPressed = {};

function onKeyDown(event) {
    keysPressed[event.key.toLowerCase()] = true;
}

function onKeyUp(event) {
    if (event.key in keysPressed) {
        keysPressed[event.key.toLowerCase()] = false;
    }
}

setInterval(main, 33);

function main() {
    if (keysPressed.w) {
        player.y -= player.movespeed
        player.direction = 0        
    }
    if (keysPressed.a) {
        player.x -= player.movespeed
        player.direction = 1
    }
    if (keysPressed.s) {
        player.y += player.movespeed
        player.direction = 2
    }
    if (keysPressed.d) {
        player.x += player.movespeed
        player.direction = 3
    }
    drawFrame()
}