"use strict";

class Player {
    constructor (canvas, startingPoint, lives, size) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvasWidth = canvas.width; 
        this.lives = lives; 
        this.size = size;
        this.x = startingPoint;
        this.y = 500;
        this.direction = 0; 
        this.speed = 0;
        this.moveChunk = this.canvasWidth / 3 - this.size / 2;
    }

    move(direction){
        if (direction === "left" && this.canGoLeft()){
            this.x -= this.moveChunk;
        } else if (direction === "right" && this.canGoRight()){
            this.x += this.moveChunk;
        }
    }

    canGoLeft(){
        return !(this.x - this.moveChunk <= 0);
    }

    canGoRight(){
        return !(this.x + this.size + this.moveChunk >= this.canvasWidth);
    }

    draw(){
        const img = new Image();
        img.src="/images/squirtle.back.png";
        this.ctx.drawImage(img, this.x, this.y, 50, 50)
        //this.ctx.fillStyle = "#081e66";
        // fillRect(x, y, widht, height)
        //this.ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    didCollide(obstacle) {
        if (
          this.x + this.size >= obstacle.x &&
          this.y + this.size > obstacle.y &&
          this.y < obstacle.y + obstacle.size &&
          this.x <= obstacle.x + obstacle.size &&
          this.y + this.size > obstacle.y &&
          this.y < obstacle.y + obstacle.size
        ) {
          return true;
        } else {
          return false;
        }
    }
}