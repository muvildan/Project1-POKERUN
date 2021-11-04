"use strict"

let myStorage = window.localStorage;

class Game {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.waterArr =[];
        this.plantArr =[];
        this.fireArr =[];
        this.player = null;
        this.gameIsOver = false; 
        this.score = 0;
        this.canvasWidth = 0;
        this.centerPosition = 0;
        this.positionChunk = 0;
        this.size = 50;
        this.obstaclePosition =[];
        this.usedPosition =[false, false, false];
        this.lives = 5;
        this.counterForNextLevel = 0;
        this.speed = 1;
        this.clap = false;
        this.fight = false;
        this.lose = false;

    }

    start() {

        this.setCanvasValues();
        this.drawScore();
        this.drawLives();

        // Create a new player for the current game
        this.player = new Player(this.canvas, this.centerPosition, 5, this.size);
        this.setEventListeners();

        // Start the canvas requestAnimationFrame loop
        this.startLoop();
    }

    startLoop(){
        const loop = () => {

            // Store the value for which the obstacles will randomly appear in any of the 3 provided lanes
            let pos = Math.floor(Math.random() * 3);

            // Generate random positioned water obstacles + delay 2s the apparition of an object in the same lane
            if (Math.random() > 0.98 && this.usedPosition[pos] === false) {
                const y = this.canvas.height - 20;
                this.waterArr.push(new Waterobstacle(this.ctx, this.randomPosition(pos), y, this.speed));
                this.usedPosition[pos] = true;
                setTimeout(() => this.enableObstacleTrack(pos), 2000);
            }

            // Generate random positioned plant obstacles + delay 2s the apparition of an object in the same lane
            if (Math.random() > 0.97 && this.usedPosition[pos] === false) {
                const y = this.canvas.height - 20;
                this.plantArr.push(new Plantobstacle(this.ctx, this.randomPosition(pos), y, this.speed));
                this.usedPosition[pos] = true;
                setTimeout(() => this.enableObstacleTrack(pos), 2000);
            }

            // Generate random positioned fire obstacles + delay 2s the apparition of an object in the same lane
            if (Math.random() > 0.99 && this.usedPosition[pos] === false) {
                const y = this.canvas.height - 20;
                this.fireArr.push(new Fireobstacle(this.ctx, this.randomPosition(pos), y, this.speed));
                this.usedPosition[pos] = true;
                setTimeout(() => this.enableObstacleTrack(pos), 2000);
            }

            // Move the obstacles
            this.waterArr.forEach((obstacle) => obstacle.move());
            this.fireArr.forEach((obstacle) => obstacle.move());
            this.plantArr.forEach((obstacle) => obstacle.move());
            
            // Filtering the obstacles arrays to avoid non-necessary memory usage
            this.plantArr = this.plantArr.filter(this.inGame);
            this.fireArr = this.fireArr.filter(this.inGame);
            this.waterArr = this.waterArr.filter(this.inGame);

            // Calling the methods to check for collisions on each obstacle and expect different outcomes
            this.checkPlantCollisions(this.plantArr);
            this.checkFireCollisions(this.fireArr);
            this.checkWaterCollisions(this.waterArr);

            // Calling the methods to update lives and score after collisions
            this.drawLives();
            this.drawScore();

            // Clear the canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Update the canvas drawing player and obstacles:

            // Method to draw the player
            this.player.draw();

            // Drawing the obstacles
            this.waterArr.forEach((obstacle) => obstacle.draw());
            this.fireArr.forEach((obstacle) => obstacle.draw());
            this.plantArr.forEach((obstacle) => obstacle.draw());

            // Events above the player happening after collision
            if(this.clap) this.draw5();
            if(this.fight) this.draw25();
            if(this.lose) this.drawEmptyheart();

            // Call method to update velocity of coming objects after reaching 100 score
            this.nextLevel();
            
            // Terminate the loop
            if(!this.gameIsOver) {
                window.requestAnimationFrame(loop);
            } else {
                buildGameOver();
                console.log(myStorage)
                const highScore = myStorage.getItem("Score");
                const result = Math.max(this.score, highScore);
                myStorage.setItem("Score", String(result));

                // Store the value of the final score to pass it to the Game Over screen
                let finalScore = document.querySelector(".score2")
                // Store the value of the highest score based on the previous played games
                let highestScore = document.querySelector(".high-score");

                // Update both the final score and the highest score 
                finalScore.textContent = this.score;
                highestScore.textContent = result
            }
        };
        // Infinite loop to update the game constantly
        window.requestAnimationFrame(loop);
    }

    // Method to set the canvas values
    setCanvasValues(){
        this.canvas = document.querySelector("canvas");
        this.ctx = canvas.getContext("2d");

        this.canvasWidth = this.canvas.width;
        this.centerPosition = this.canvasWidth / 2 - this.size/2;
        this.positionChunk = this.canvasWidth / 3 - this.size /2;
        this.obstaclePosition = [
            this.centerPosition - this.positionChunk,
            this.centerPosition,
            this.centerPosition + this.positionChunk,
        ];
    }

    // Method to check fire collisions
    checkFireCollisions(obstaclesArray) {
        obstaclesArray.forEach((obstacle, index) => {
            if (this.player.didCollide(obstacle)) {
                if (obstacle.upScore){
                    this.score += 25;
                    this.counterForNextLevel += 25;
                    this.nextLevel();
                    obstacle.upScore = !obstacle.upScore;
                }
                obstaclesArray.splice(index, 1);
                this.fight = true;
                setTimeout(() => this.fight = false, 300);
            } 
        }
    )};

    // Method to check water collisions
    checkWaterCollisions(obstaclesArray) {
        obstaclesArray.forEach((obstacle) => {
            if (this.player.didCollide(obstacle)) {
                if (obstacle.upScore){
                    this.score += 5;
                    this.counterForNextLevel += 5;
                    this.nextLevel();
                    obstacle.upScore = !obstacle.upScore;
                }
                this.clap = true;
                setTimeout(() => this.clap = false, 300)
                }
        })
    }

    // Method to check plant collisions
    checkPlantCollisions(obstaclesArray) {
        obstaclesArray.forEach((obstacle, index) => {
            if (this.player.didCollide(obstacle)) {
                if(obstacle.deadly) {
                    this.lives--;
                    obstacle.deadly = !obstacle.deadly;
                }
                this.lose = true;
                setTimeout(() => this.lose = false, 300);
                obstaclesArray.splice(index, 1);
            } if (this.lives <= 0){
                this.updateGameScore();
                this.gameIsOver = true;
            }
        }); 
    }

    // Method to draw a 5 above the player
    draw5() {
        const img = new Image();
        img.src="images/5.png";
        this.ctx.drawImage(img, this.player.x+22, this.player.y-30, 15, 22)
    }

    // Method to draw a 25 above the player
    draw25(){
        const img2 = new Image();
        img2.src="images/25.png";
        this.ctx.drawImage(img2, this.player.x+20, this.player.y-30, 25, 20)
    }

    // Method to draw an empty heart to showcase how they're losing life
    drawEmptyheart(){
        const img3 = new Image();
        img3.src="images/empty heart.png";
        this.ctx.drawImage(img3, this.player.x+20, this.player.y-30, 25, 20)
    }

    // Method to randomize the position of the obstacles
    randomPosition(position){
        return this.obstaclePosition[position];
    }

    // Setting the event listener to let the player control the game with left and right arrows
    setEventListeners(){
        this.handleKeyDown = (event) => {
            if (event.code === "ArrowLeft") this.player.move("left");
            if (event.code === "ArrowRight") this.player.move("right");
        };
        document.body.addEventListener("keydown", this.handleKeyDown);
    }

    // Method to track the position of the obstacles through the canvas
    enableObstacleTrack(position){
        this.usedPosition[position] = false;
    }

    // Method to check whether the object is in the outside its y to delete it
    inGame = (obj) => {
        let counter = 0
        if (obj.y < this.canvas.height){
            return true;
        } else {
            this.score += 1;
            this.counterForNextLevel += 1;
            this.nextLevel();
            return false;
        }
    }

    // Method to draw as many lives as the player has dinamically, outside the canvas
    drawLives () {
        let indicator = document.querySelector(".lives");
        let indicatorContent = "";
        for(let i = 0; i < this.lives; i++){ 
            indicatorContent += "<img src='images/heart.gif' />"
        }
        indicator.innerHTML = indicatorContent;
    }

    // Method to dinamically draw the score of the player outside the canvas
    drawScore () {
        let indicator = document.querySelector(".score");
        indicator.innerHTML = this.score;
    }

    // Method to create new levels based on surpasing the goal of scoring 100 points + 
    nextLevel(){
        if (this.counterForNextLevel > 100){
            this.speed *= 1.2;
            this.counterForNextLevel = 0;
        }
    }

    // Mehtod to update the highest game score in case it's been achieved
    updateGameScore(){
        if (this.score > this.highScore){
            this.highScore = this.score;
        }
    }
}