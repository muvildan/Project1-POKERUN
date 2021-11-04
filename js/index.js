// Here comes the general function that will update the HTML content dinamically
const buildDom = (html) => {
    const main = document.querySelector("main");
    main.innerHTML = html;
};

// First screen => Splash Screen
const buildSplashScreen = () => {
    buildDom(`
<div class= "start-screen"> 
<div> </div>
<button id="squirtle-button"></button>
<button id="charmander-button"></button>
<button id="bulbasaur-button"></button>
</div>
`);
let startButton = document.getElementById("squirtle-button");
startButton.addEventListener("click", buildGameScreen);
;
startButton = document.getElementById("charmander-button");
startButton.addEventListener("click", buildGameScreen);
;
startButton = document.getElementById("bulbasaur-button");
startButton.addEventListener("click", buildGameScreen);
};

// Game Screen
const buildGameScreen = () => {
    buildDom(`
    <div class="game-board">
        <canvas id="canvas" width="600" height="600"></canvas>
        <div class="score">Score: 0</div>
        <div class="lives"></div>
    </div>
`);

const game = new Game();
game.start();
};

// Instructions Screen
const buildInstructions = () => {
    buildDom(`
<section class="instructions">
    <div></div>
    <div></div>`
)
}

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