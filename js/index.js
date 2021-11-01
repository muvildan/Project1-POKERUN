// Here comes the general function that will update the HTML content dinamically
const buildDom = (html) => {
    const main = document.querySelector("main");
    main.innerHTML = html;
};

// First screen => Splash Screen
const buildSplashScreen = () => {
    buildDom(`
<img src="../images/pokerun.png" alt"POKERUN" />
<button id="start-button">Start Game</button>
`);
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", buildGameScreen);
};

// Game Screen
const buildGameScreen = () => {
    buildDom(`

<div class="game-board">
<div class="score">Score: 0</div> 
<div id="lives" Lives: 3>
<canvas id="canvas" width="600" height="600"></canvas>
</div>
`);

const game = new Game();
game.start();
};

//Last screen => Game Over
const buildGameOver = () => {
buildDom(`
<section class="game-over">
<h1>GAME OVER</h1>
<button id="game"> TRY AGAIN</button>
<div class="pointer"></div>
</section>
`);

const restartButton = document.querySelector("button");
restartButton.addEventListener("click", buildGameScreen);
};

/* When the winodws loads, "buildSplashScreen" function will be run 
and "load" will wait for the HTML and JS */
window.addEventListener("load", buildSplashScreen);