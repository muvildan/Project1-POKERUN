// Here comes the general function that will update the HTML content dinamically

const buildDom = (html) => {
    const main = document.querySelector("main");
    main.innerHTML = html;
};

// First screen => Splash Screen
const buildSplashScreen = () => {
    buildDom(`
<div class= "start-screen">
    <div class= "title"> </div>
    <div class="buttons">
        <button id="squirtle-button"></button>
        <button id="charmander-button"></button>
        <button id="bulbasaur-button"></button>
    </div>
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

// Instructions Screen

// Game Screen
const buildGameScreen = () => {
    buildDom(`
    <div class="game-board">
        <div class="background">
            <div class="nav-bar">
                <div class="score-text">
                <div>Score: </div>
                <div class="score">0</div>
                </div>
                <canvas id="canvas" width="600" height="600"></canvas>
                <div class="lives"></div>
        </div>
        </div>
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
    <div></div>
    
`);
}

//Last screen => Game Over
const buildGameOver = () => {
buildDom(`
<section class="game-over">
    <h1 class="Game-over"> Game Over </h1>
        <h2>Highest score:</h2><span class="high-score"></span>
        <h2>Score: </h2><span class="score2"> </span>
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