class Plantobstacle {
    constructor(ctx, x, y, speed){
        this.ctx = ctx; 
        this.x = x; 
        this.y = y - 600;
        this.color = "#2cbf33";
        this.speed = speed; 
        this.size = 50;
        this.deadly = true;
    }

    draw(){
        const img = new Image();
        img.src="images/bulbasur-front.png";
        this.ctx.drawImage(img, this.x, this.y, this.size, this.size);
        //this.ctx.fillStyle = this.color;
        //this.ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    move(){
        this.y -= this.speed * -3.5;
    }
}