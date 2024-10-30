
const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
ctx.fillStyle = "#008FA6";
ctx.rect(0,0,canvas.width,canvas.height)
ctx.fill();
let spriteSheetLoc = "./pixel_boat_scaled_5x_v2.png"
let image = new Image()
image.src = spriteSheetLoc;

const BOAT_SIZE = 32*5

let sourceX = 0;
let sourceY = 0;

function debug(){
    ctx.fillStyle = "black"
    ctx.font = "14px sans serif";
    ctx.fillText(`x: ${player.x}`, 20,20)
    ctx.fillText(`y: ${player.y}`, 20,40)
}

function drawFrame() {

    ctx.fillStyle = "#9FD9E3";
    ctx.fill();

    debug()

    if (player.x > 455) {
        player.x = -105 
    }
    if (player.x < -105) {
        player.x = 446 
    }
    if (player.y > 485) {
        player.y = -80
    }
    if (player.y < - 90) {
        player.y = 476
    }
    
    switch(player.direction) { //wasd
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