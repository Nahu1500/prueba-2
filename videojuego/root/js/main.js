var Game = {
    canvas : undefined,
    canvasContext : undefined,
    backgroundSprite : undefined,
    ballSprite : undefined,
    ballPosition : { x : 0, y : 50 },
    planeSprite : undefined,
    mousePosition : { x : 0, y : 0 },
    planePosition : { x : 72, y : 405 },
    planeOrigin : { x : 34, y : 34 },
    planeRotation : 0
};

Game.clearCanvas = function () {
    Game.canvasContext.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
};

Game.drawImage = function (sprite, position, rotation, origin) {
    Game.canvasContext.save();
    Game.canvasContext.translate(position.x, position.y);
    Game.canvasContext.rotate(rotation);
    Game.canvasContext.drawImage(sprite, 0, 0, sprite.width, sprite.height,
        -origin.x, -origin.y, sprite.width, sprite.height);
    Game.canvasContext.restore();
};

Game.start = function () {
    Game.canvas = document.getElementById("space");
    Game.canvasContext = Game.canvas.getContext("2d");
    Game.backgroundSprite = new Image();
    Game.backgroundSprite.src = "img/fondoespacial4.jpg";
    Game.ballSprite = new Image();
    Game.ballSprite.src = "img/navefinal4.png";
    //Game.planeSprite = new Image();
   // Game.planeSprite.src = "navefinal2.png";
    window.setTimeout(Game.mainLoop, 500);
};

document.addEventListener( 'DOMContentLoaded', Game.start);

Game.clearCanvas = function () {
    Game.canvasContext.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
};

Game.drawImage = function (sprite, position) {
    Game.canvasContext.save();
    Game.canvasContext.translate(position.x, position.y);
    Game.canvasContext.drawImage(sprite, 0, 0, sprite.width, sprite.height,
        0, 0, sprite.width, sprite.height);
    Game.canvasContext.restore();
};

Game.mainLoop = function() {
    Game.clearCanvas();
    Game.update();
    Game.draw();
    window.setTimeout(Game.mainLoop, 1000 / 60);
};

Game.update = function () {
    var d = new Date();
    //Game.ballPosition.x = d.getTime() * 0.1 % Game.canvas.width;
};

Game.draw = function () {
    Game.drawImage(Game.backgroundSprite, { x : 0, y : 0 });
    Game.drawImage(Game.ballSprite, Game.ballPosition);
};

var myGamePiece;
var myObstacle;

function startGame() {
  myGamePiece = new component(30, 30, "red", 10, 120);
  myObstacle = new component(10, 200, "green", 300, 120);
  myGameArea.start();
}

function updateGameArea() {
  myGameArea.clear();
  myObstacle.update();
  myGamePiece.newPos();
  myGamePiece.update();
}