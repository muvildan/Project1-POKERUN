"use strict"

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

    }

    start() {
        // Append canvas to the DOM, create a Player and start the Canvas loop
        // Save reference to canvas and Create ctx
        this.setCanvasValues();
        this.drawScore();
        this.drawLives();

        // Create a new player for the current game
        this.player = new Player(this.canvas, this.centerPosition, 5, this.size);
        this.setEventListeners();

        /*let leftLane= (this.width / 3) - (this.width/3)/2;
        let centerLane= this.width / 2
        let rightLane= (this.width) - (this.width/3)/2;
        this.boardLanes.push(leftLane, centerLane, rightLane)*/

        // Start the canvas requestAnimationFrame loop
        this.startLoop();
    }

    startLoop(){
        const loop = () => {
            // this.y = this.canvasHeight / 2 - this.size / 2;
            // We create the obstacles with random y
            let pos = Math.floor(Math.random() * 3);

            if (Math.random() > 0.99 && this.usedPosition[pos] === false) {
                const y = this.canvas.height - 20;
                this.waterArr.push(new Waterobstacle(this.ctx, this.randomPosition(pos), y, this.speed));
                this.usedPosition[pos] = true;
                setTimeout(() => this.enableObstacleTrack(pos), 3500);
            }

            if (Math.random() > 0.99 && this.usedPosition[pos] === false) {
                const y = this.canvas.height - 20;
                this.plantArr.push(new Plantobstacle(this.ctx, this.randomPosition(pos), y, this.speed));
                this.usedPosition[pos] = true;
                setTimeout(() => this.enableObstacleTrack(pos), 3500);
            }

            if (Math.random() > 0.99 && this.usedPosition[pos] === false) {
                const y = this.canvas.height - 20;
                this.fireArr.push(new Fireobstacle(this.ctx, this.randomPosition(pos), y, this.speed));
                this.usedPosition[pos] = true;
                setTimeout(() => this.enableObstacleTrack(pos), 3500);
            }

            // 1. UPDATE THE STATE OF PLAYER AND WE MOVE THE OBSTACLES
            this.waterArr.forEach((obstacle) => {
                obstacle.move();
            });

            this.fireArr.forEach((obstacle) => {
                obstacle.move();
            });

            this.plantArr.forEach((obstacle) => {
                obstacle.move();
            });
            

            this.plantArr = this.plantArr.filter(this.inGame);
            this.fireArr = this.fireArr.filter(this.inGame);
            this.waterArr = this.waterArr.filter(this.inGame);

            this.checkPlantCollisions(this.plantArr);
            this.checkFireCollisions(this.fireArr);
            this.checkWaterCollisions(this.waterArr);

    
            this.drawLives();
            this.drawScore();

            //2. Clear the canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            //3. Update the canvas
            //Draw the player
            this.player.draw();

            if(this.clap) {
                this.drawClap();
            }

            //Draw the obstacles
            this.waterArr.forEach((obstacle) => {
                obstacle.draw();
            });
            
            this.fireArr.forEach((obstacle) => {
                obstacle.draw();
            });
            
            this.plantArr.forEach((obstacle) => {
                obstacle.draw();
            });

            this.nextLevel();
            
            //4. Terminate the loop
            if(!this.gameIsOver) {
                window.requestAnimationFrame(loop);
            } else {
                buildGameOver();
            }
        };
        // As loop function will be continuously invoked by
        // the `window` object- `window.requestAnimationFrame(loop)`
        // we need to `start an infinitive loop` till the game is over
        window.requestAnimationFrame(loop);
    }

    checkFireCollisions(obstaclesArray) {
        obstaclesArray.forEach((obstacle, index) => {
            if (this.player.didCollide(obstacle)) {
                if (obstacle.upScore){
                    this.score += 50;
                    this.counterForNextLevel += 50;
                    this.nextLevel();
                    obstacle.upScore = !obstacle.upScore;
                }
                obstaclesArray.splice(index, 1);
            } 
        }
    )};

    checkPlantCollisions(obstaclesArray) {
        obstaclesArray.forEach((obstacle, index) => {
            if (this.player.didCollide(obstacle)) {
                if(obstacle.deadly) {
                    this.lives--;
                    obstacle.deadly = !obstacle.deadly;
                }
            obstaclesArray.splice(index, 1);
            } if (this.lives <= 0){
                this.gameIsOver = true;
            }
        }); 
    }

    checkWaterCollisions(obstaclesArray) {
        obstaclesArray.forEach((obstacle) => {
            if (this.player.didCollide(obstacle)) {
                this.clap = true
                setTimeout(() => this.clap = false, 1000)
                console.log('clap', this.clap)
                console.log(`yo, ${this.player.x}, ${this.player.y}`);
                }
        })
    }

    drawClap() {
        console.log('drawing clap')
        const img = new Image();
        img.src="../images/handshake.png";
        this.ctx.drawImage(img, this.player.x-15, this.player.y-75, 75, 75)
    }


    randomPosition(position){
        return this.obstaclePosition[position];
    }

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


    setEventListeners(){
        //Add an event listener for moving the player
        this.handleKeyDown = (event) => {
            if (event.code === "ArrowLeft") {
                this.player.move("left");
            } else if (event.code === "ArrowRight") {
                this.player.move("right");
            }
        };


        //Any function provided to eventListener
        document.body.addEventListener("keydown", this.handleKeyDown);
    }

    enableObstacleTrack(position){
        this.usedPosition[position] = false;
    }

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
    
    drawLives () {
        let indicator = document.querySelector(".lives");
        
        let indicatorContent = "";
        for(let i = 0; i < this.lives; i++){ 
            indicatorContent += "<img src='../images/heart.gif' />"
        }
        indicator.innerHTML = indicatorContent;
    }

    drawScore () {
        let indicator = document.querySelector(".score");
        indicator.innerHTML = this.score;
    }

    nextLevel(){
        if (this.counterForNextLevel > 100){
            this.speed *= 1.2;
            this.counterForNextLevel = 0;
        }
    }

}