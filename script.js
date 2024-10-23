
const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
ctx.fillStyle = "white"
ctx.fillRect(0,0,canvas.width,canvas.height)

function drawFrame() {
    ctx.fillStyle = "white"
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = "black";

    if (player.x > canvas.width) {
        player.x %= canvas.width
    }
    if (player.x < 0) {
        player.x += canvas.width
    }
    if (player.y > canvas.height) {
        player.y %= canvas.height
    }
    if (player.y < 0) {
        player.y += canvas.height
    }
    ctx.fillRect(player.x,player.y,50,50);
}

const player = {
    x: 10,
    y: 10,
    movespeed: 4,
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