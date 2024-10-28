
const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
ctx.fillStyle = "#9FD9E3";
ctx.rect(0,0,canvas.width,canvas.height)
ctx.fill();
var spriteSheetLoc = "./pixel_boat_scaled_5x.png"
var image = new Image()
image.src = spriteSheetLoc;

const BOAT_SIZE = 32*5

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

    ctx.drawImage(
        image,
        0,
        0,
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
    }
    if (keysPressed.a) {
        player.x -= player.movespeed
    }
    if (keysPressed.s) {
        player.y += player.movespeed
    }
    if (keysPressed.d) {
        player.x += player.movespeed
    }
    drawFrame()
}