const canvas = document.getElementById("canvas");
const ctx = canvas.getContext ("2d");
const highScoreElement = document.querySelector(".high__score");

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

bird.src = "image/flappy_bird_bird.png";
bg.src = "image/flappy_bird_bg.png";
fg.src = "image/flappy_bird_fg.png";
pipeUp.src = "image/flappy_bird_pipeUp.png";
pipeBottom.src = "image/flappy_bird_pipeBottom.png";

let highScore = localStorage.getItem("high__score") || 0;


const gap = 90;

let pipe = [];
pipe [0] = {
    x : canvas.width,
    y : 0
}

score = 0;

// Разположения птички
let xPos = 10;
let yPos = 100;
let grav = 0.7;

document.addEventListener("keydown", moveUp);

GameOver = () => {
    alert("GameOver. Please press OK to restart!");
    location.reload();
}

function moveUp() {
    yPos -= 30;
}

function draw() {
    ctx.drawImage(bg, 0, 0);

    for(let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if(pipe[i].x == 50) {
            pipe.push({
                x : canvas.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
                || yPos + bird.height >= canvas.height - fg.height) {
                return GameOver();
                }

        if(pipe[i].x == 5) {
            score++;

            highScore = score >= highScore ? score : highScore;
            localStorage.setItem("high__score", highScore);
            highScoreElement.innerText = `High Score: ${highScore}`;
        }
    }   


    ctx.drawImage(fg, 0, canvas.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    ctx.fillStyle = "#000";
    ctx.font = "25px Verdana";
    ctx.fillText("Счёт: " + score, 10, canvas.height - 50);
    ctx.fillText("Наилучший счёт: " + highScore, 10, canvas.height - 20);
    yPos += grav;
    requestAnimationFrame(draw);
}

pipeBottom.onload = draw ();
