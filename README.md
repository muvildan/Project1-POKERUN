# POKÉ-RUN 
Pokémon has always been a game of mental calculations. Will I be faster than my oponent? Is my Pokémon type stronger than my oponent's type?
In a much simpler way, that's what POKÉ-RUN replicates!
You will have to move fast and apply the logic of types to get to the max score possible. 

## How does it work?
Move your player with the left and right arrows of your keyboard, and decide whether you need to collide with coming Pokémon or not based on your type and their type.
Collide with weaker Pokémon than yous, and you'll get 25 juicy points to add to your score!
Collide with Pokémon that are the same type as you are, and you'll add up 5 helpful points to your score.
But be careful: collide with Pokémon that are stronger than you, and you'll lose 1 live.


* * *
## MVP
### Technique
HTML5, DOM, **Canvas** and Vanilla **Javascript**

### Game states
* __Start Screen__
  * Title
  * Start Game buttons
* __Game Screen__
  * Canvas
  * Score counter
  * Lives counter
* __Game Over Screen__
  * Highest score reached
  * Your score
  * Retry button

### Game
* Create interface
* Create obstacles
    * Randomize obstacles appearence in any of the 3 limited tracks in the canvas
    * Make objects appear with different probabilities depending on whether they are obstacles or bonuses
* Create player
* Move player
  * Press arrow keys to move the player around the board.
* Check collisions
  * If there is a collision with an weaker obstacle => player gains 25 score points => Add up to counterForNextLevel
  * If there is a collision with a same-type obstacle => player gains 5 score points => Add up to counterForNextLevel
  * If there is a collision with a stronger obstacle => Lose 1 live => If you lose 5 lives =>Game Over => Show Game Over Screen
* * *

### User stories
- User can see the Start Screen
- User can click on the "Pokeball" buttons to start the game
- User can see the Game Screen
- User can see the Canvas
- User can see the Player
- User can see a Canvas background image
- User can move the Player left and right
- User can see obstacles coming to his avatar in the canvas
- User can collide or dodge the obstacles
- User can see its score increasing outside the canvas
- User can see lives decreasing outside the canvas
- User can be killed when colliding 5 times with stronger obstacles
- User can see the Game Over Screen
- User can see the Highest Score reached
- User can see his current Score achieved
- User can see a Retry button
- User can click on Retry button

## BACK LOG
### Music
* Add music on and off button to setup
* Add sound effects on and off button to setup

## Data structure
__index.js__
````
createStartScreen();
createGameScreen();
createGameOverScreen();
````
__Game.js__
````
function Game(){
this.canvas;
this.ctx;
this.waterArr;
this.plantArr;
this.fireArr;
this.player;
this.gameIsOver = false; 
this.score = 0;
this.canvasWidth = 0;
this.centerPosition = 0;
this.positionChunk;
this.size;
this.obstaclePosition;
this.usedPosition;
this.lives;
this.counterForNextLevel;
this.speed;
this.clap;
this.fight;
this.lose;
};
````
__Player.js__
````
function Player(){
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
};
move(direction);
canGoLeft();
canGoRight();
draw();
didCollide(obstacle);
````
__Water.js__
````
function Waterobstacle(){
this.ctx; 
this.x; 
this.y;
this.speed; 
this.size;
this.upScore;
};
draw();
move();

````
__Fire.js__
````
function Fireobstacles(){
this.ctx;
this.x; 
this.y;
this.speed;
this.size;
this.upScore;
};
draw();
move();

````
__Plant.js__
````
function Plantobstacles(){
this.ctx;
this.x; 
this.y;
this.speed;
this.size;
this.deadly
};
draw();
move();
````
