class Waterobstacle {
    constructor(ctx, x, y, speed, type){
        this.ctx = ctx; 
        this.x = x; 
        this.y = y - 600; 
        this.color = "#2b6dbd";
        this.speed = speed; 
        this.size = 50;
        this.type = type;
    }

    draw(){
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    move(){
        this.y -= this.speed * -3.5;
    }
}