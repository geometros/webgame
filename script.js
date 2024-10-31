const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
const oceanColor = "#9FD9E3"
ctx.fillStyle = oceanColor;
ctx.rect(0,0,canvas.width,canvas.height)
ctx.fill();

let gameClock = 0;

let playerImage = new Image()
playerImage.src = "./pixel_boat_scaled_5x_v2.png";
const BOAT_SIZE = 32*5

let sourceX = 0;
let sourceY = 0;

let beastImage = new Image()
beastImage.src = "./creatures_scaled_5x.png"

const player = {
    x: 10,
    y: 10,
    direction: 'w',
    movespeed: 3,
    fire: false,
    timeFired: -500,
    cooldown: 100,
    score: 0,
}

const cannonball = {
    x: null,
    y: null,
    direction: null,
    speed: 5,
    next() {
        if (this.direction == 'w'){this.y -= this.speed}
        if (this.direction == 'a'){this.x -= this.speed}
        if (this.direction == 's'){this.y += this.speed}
        if (this.direction == 'd'){this.x += this.speed}
        if (this.x < -10 || this.x > canvas.width + 10 || this.y < -10 || this.y > canvas.width + 10) {
            this.despawn()       
        }
    },
    despawn() {
        this.x = null;
        this.y = null;
        this.direction = null;
        player.fire = false;     
    },
}

const beast = {
    x: null,
    y: null,
    alive: 0,
    spawnRate: 500,
    spawn() {
        this.x = Math.floor(Math.random() * (canvas.width - 100))
        this.y = Math.floor(Math.random() * (canvas.height - 100))
    },
    despawn() {
        this.x = null;
        this.y = null;
        beast.alive = 0;
    },
    kill() {}
}

function debug(){
    ctx.fillStyle = "black";
    ctx.font = "14px sans serif";
    ctx.fillText(`x: ${player.x}`, 10,20);
    ctx.fillText(`y: ${player.y}`, 10,40);
    ctx.fillText("beast", 10, 60);
    ctx.fillText(`x: ${beast.x}`,10,80);
    ctx.fillText(`y: ${beast.y}`,10,100);
    ctx.fillText(cannonball.x,10,120);

    ctx.fillStyle = "red"
    ctx.beginPath();
    ctx.arc(player.x,player.y,2,0,2*Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(beast.x,beast.y,2,0,2*Math.PI);
    ctx.stroke();
    ctx.fill();

    //beast.spawnRate = 10;
}

function wrangleEntities() { //handle collisions, spawning, kills here
    if (beast.x == null){
        beast.spawn();
    }
    else if (beast.alive > beast.spawnRate){
        beast.despawn();
    }
    else {
        beast.alive++;
    }

    if (cannonball.x){
        cannonball.next();
    }

    if ((beast.x + 20 < cannonball.x && beast.x + 140 > cannonball.x) && (beast.y + 45 < cannonball.y && beast.y + 105 > cannonball.y)) {
        cannonball.despawn();
        beast.despawn();
        player.score++;
    }
}

function drawFrame() {

    ctx.fillStyle = oceanColor;
    ctx.rect(0,0,canvas.width,canvas.height);
    ctx.fill();

    ctx.fillStyle = "green";
    ctx.font = "24px sans serif";
    ctx.fillText(`SCORE: ${player.score}`,(canvas.width / 2) - 50,30);

    wrangleEntities()

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
    
    switch(player.direction) {
        case 'w':
            sourceX = 0;
            sourceY = 0;
            break;
        case 'a':
            sourceX = BOAT_SIZE + 1;
            sourceY = BOAT_SIZE + 1;
            break;
        case 's':
            sourceX = 0;
            sourceY = BOAT_SIZE + 1;
            break;
        case 'd':
            sourceX = BOAT_SIZE + 1;
            sourceY = 0;
            break;
    }

    ctx.drawImage(
        playerImage,
        sourceX,
        sourceY,
        BOAT_SIZE,
        BOAT_SIZE,
        player.x,
        player.y,
        BOAT_SIZE,
        BOAT_SIZE,
    )

    if (beast.x != null) {
        ctx.drawImage(
            beastImage,
            beast.x,
            beast.y,
        )
    }

    if (cannonball.x){
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(cannonball.x,cannonball.y,3,0,2*Math.PI)
        ctx.stroke();
        ctx.fill();
    }

    debug()
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

function main() {
    window.requestAnimationFrame(main);
    
    gameClock++;

    if (keysPressed.w) {
        player.y -= player.movespeed;
        player.direction = 'w';
    }
    if (keysPressed.a) {
        player.x -= player.movespeed;
        player.direction = 'a';
    }
    if (keysPressed.s) {
        player.y += player.movespeed;
        player.direction = 's';
    }
    if (keysPressed.d) {
        player.x += player.movespeed;
        player.direction = 'd';
    }
    if (keysPressed[' ']) {
        if (gameClock > player.timeFired + player.cooldown && player.fire == false) {
            player.fire = true;
            player.timeFired = gameClock;
            cannonball.x = player.x;
            cannonball.y = player.y;
            cannonball.direction = player.direction;
        }
    }
    drawFrame();
}

main();