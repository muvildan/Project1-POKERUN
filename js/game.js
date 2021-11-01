"use strict"

class Game {
    constructor() {
        this.canvas = null; 
        this.ctx = null; 
        this.Waterobstacle =[];
        this.Plantobstacle =[];
        this.Fireobstacle =[];
        this.player = null;
        this.gameIsOver = false; 
        this.score = 0;
        this.canvasWidth = 0;
        this.centerPosition = 0;
        this.positionChunk = 0;
        this.size = 50;
        this.obstaclePosition =[];
        this.usedPosition =[false, false, false];
    }

    start() {
        // Append canvas to the DOM, create a Player and start the Canvas loop
        // Save reference to canvas and Create ctx
        this.setCanvasValues();

        // Create a new player for the current game
        this.player = new Player(this.canvas, this.centerPosition, 3);
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

            if (Math.random() > 0.991 && this.usedPosition[pos] === false) {
                const y = this.canvas.height - 20;
                this.Waterobstacle.push(new Waterobstacle(this.ctx, this.randomPosition(pos), y, 1));
                this.usedPosition[pos] = true;
                setTimeout(() => this.enableObstacleTrack(pos), 4000);
            }

            if (Math.random() > 0.991 && this.usedPosition[pos] === false) {
                const y = this.canvas.height - 20;
                this.Plantobstacle.push(new Plantobstacle(this.ctx, this.randomPosition(pos), y, 1));
                this.usedPosition[pos] = true;
                setTimeout(() => this.enableObstacleTrack(pos), 4000);
            }

            if (Math.random() > 0.999 && this.usedPosition[pos] === false) {
                const y = this.canvas.height - 20;
                this.Fireobstacle.push(new Fireobstacle(this.ctx, this.randomPosition(pos), y, 1));
                this.usedPosition[pos] = true;
                setTimeout(() => this.enableObstacleTrack(pos), 4000);
            }

            // 1. UPDATE THE STATE OF PLAYER AND WE MOVE THE OBSTACLES
            this.Waterobstacle.forEach((obstacle) => {
                obstacle.move();
            });

            this.Fireobstacle.forEach((obstacle) => {
                obstacle.move();
            });

            this.Plantobstacle.forEach((obstacle) => {
                obstacle.move();
            });
            

            this.Plantobstacle  = this.Plantobstacle.filter(this.inGame)

            this.checkPlantCollisions(this.Plantobstacle);

            //2. Clear the canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            //3. Update the canvas
            //Draw the player
            this.player.draw();

            //Draw the obstacles
            this.Waterobstacle.forEach((obstacle) => {
                obstacle.draw();
            });

            this.Fireobstacle.forEach((obstacle) => {
                obstacle.draw();
            });

            this.Plantobstacle.forEach((obstacle) => {
                obstacle.draw();
            });

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

    checkPlantCollisions(obastaclesArray) {
        obastaclesArray.forEach((obstacle) => {
            if (this.player.didCollide(obstacle)) {
                if(obstacle.deadly) {
                    this.player.lives--;
                    obstacle.deadly = !obstacle.deadly;
                }
            } if (this.player.lives <= 0){
                this.gameIsOver = true;
            }
        }); 
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

    inGame = (obj) => {
        return obj.y < this.canvas.height
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

    



}