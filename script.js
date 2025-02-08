function controller(event) {
    if (event.key == "Enter") {
        if (runWorker == 0) {
            run();
            runSound.play();
            updateScore();
            moveBackground();
            flamesX.forEach(createFlames);
        }
    }

    if (event.key == " ") {
        if (jumpWorker == 0) {
            if (runWorker != 0) {
                clearInterval(runWorker);
                runSound.pause();
                jump();
                jumpSound.play();
            }
        }
    }

}

var runImage = 1;
var runWorker = 0;
var runSound = new Audio("run.mp3");
runSound.loop = true;

function run() {
    runWorker = setInterval(() => {
        runImage = runImage + 1;

        if (runImage == 9) {
            runImage = 1;
        }

        document.getElementById("boy").src = "run" + runImage + ".png";
    }, 150);

}

var jumpWorker = 0;
var jumpImage = 1;
var jumpMarginTop = 244;
var jumpSound = new Audio("jump.mp3");

function jump() {
    jumpWorker = setInterval(
        () => {
            jumpImage = jumpImage + 1;
            if (jumpImage < 8) {
                jumpMarginTop = jumpMarginTop - 15;
                document.getElementById("boy").style.marginTop = jumpMarginTop + "px";
            }

            if (jumpImage > 7) {
                jumpMarginTop = jumpMarginTop + 15;
                document.getElementById("boy").style.marginTop = jumpMarginTop + "px";
            }

            if (jumpImage == 13) {
                jumpImage = 1;
                clearInterval(jumpWorker);
                run();
                runSound.play();
                jumpWorker = 0;
            }

            document.getElementById("boy").src = "jump" + jumpImage + ".png";
        }, 150
    );

}
var score = 0;
var scoreWorker = 0;

function updateScore() {
    scoreWorker = setInterval(
        () => {
            if (score == 2550) {
                alert("You Won ! Press OK to Restart");
                window.location.reload();
            }

            score = score + 10;
            document.getElementById("score").innerHTML = score;
        }, 100
    );

}

var backgroundX = 0;
var backgroundWorker = 0;

function moveBackground() {
    backgroundWorker = setInterval(
        () => {
            backgroundX = backgroundX - 10;
            document.getElementById("background").style.backgroundPositionX = backgroundX + "px";
        }, 50
    );

}

var flamesX = [500, 1000, 2000, 3000, 4000, 5000];
var flameWorker = 0;

function createFlames(x) {
    var i = document.createElement("img");
    i.src = "flame.gif";
    i.style.height = "150px";
    i.style.marginTop = "425px";
    i.style.marginLeft = x + "px";
    i.style.position = "absolute";
    document.getElementById("background").appendChild(i);

    flameWorker = setInterval(
        () => {
            if (flameWorker != 0) {
                x = x - 10;
                i.style.marginLeft = x + "px";
            }

            if (x == 150) {
                if (jumpWorker == 0) {

                    clearInterval(runWorker);
                    runSound.pause();

                    clearInterval(scoreWorker);

                    clearInterval(backgroundWorker);

                    clearInterval(flameWorker);

                    flameWorker = 0;

                    dead();
                    deadSound.play();
                }
            }
        }, 50
    );

}

var deadWorker = 0;
var deadImageNumber = 1;
var deadSound = new Audio("dead.mp3");

function dead() {
    deadWorker = setInterval(
        () => {
            deadImageNumber = deadImageNumber + 1;
            if (deadImageNumber == 11) {
                deadImageNumber = 1;
                clearInterval(deadWorker);
                alert("Game Over ! Press OK to Restart");
                window.location.reload();
            }
            document.getElementById("boy").src = "dead" + deadImageNumber + ".png";
        }, 100
    );

}