



const Game = require('./game');

const myGame = new Game();


myGame.showFurry()
myGame.showCoin();
myGame.startGame();

document.addEventListener('keydown', function(event) {
    myGame.turnFurry(event);
});