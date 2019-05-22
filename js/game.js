const Coin = require('./coin');
const Furry = require('./furry');

function Game() {
    const self = this;

    this.board = document.querySelectorAll('#board div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function (x, y) {
        return x + (y * 10);
    };
    this.showFurry = function() {
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    };

    this.showCoin = function() {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    };

    this.moveFurry = function() {
        this.gameOver();
        this.hideVisibleFurry();

        if (this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction === "top") {
            this.furry.y = this.furry.y - 1;
        } else if (this.furry.direction === "bottom") {
            this.furry.y = this.furry.y + 1;
        }

        this.showFurry();
        this.checkCoinCollision();
    };

    this.hideVisibleFurry = function() {
        document.querySelector('.furry').classList.remove('furry');
    };

    this.turnFurry = function(event) {
        switch (event.which) {
            case 37:
            this.furry.direction = "left";
            break;
            case 38:
            this.furry.direction = "top";
            break;
            case 39:
            this.furry.direction = "right";
            break;
            case 40:
            this.furry.direction = "bottom";
            break;
        }
    };

    this.checkCoinCollision = function() {
        
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            document.querySelector(".coin").classList.remove("coin");
            this.score++;
            document.querySelector("#score strong").innerHTML = this.score;

            this.coin = new Coin();
            this.showCoin();
            this.goFaster();
        }

        
    };

    this.gameOver = function() {
        if (this.furry.x < 0 || this.furry.y < 0 || this.furry.x > 9 || this.furry.y > 9) {
            clearInterval(this.idSetInterval);

            document.querySelector('#board').classList.add('invisible');
            document.querySelector('#score').classList.add('invisible');
            document.querySelector('section#over').classList.remove('invisible');

            const gameMessage = document.createElement('h2');
            gameMessage.innerHTML = `Game Over! Your score is ${this.score}`;

            document.querySelector('#over').appendChild(gameMessage);

            this.hideVisibleFurry();
        }
    };


    this.startGame = function() {
        this.idSetInterval = setInterval(function() {
            self.moveFurry();
        }, 250);
    };

    this.goFaster = function() {
        if (this.score > 20) {
            clearInterval(this.idSetInterval);
            this.idSetInterval = setInterval(function() {
                self.moveFurry();
            }, 150);
        } else if (this.score > 10) {
            clearInterval(this.idSetInterval);
            this.idSetInterval = setInterval(function() {
                self.moveFurry();
            }, 200);
        }
    }
}

module.exports = Game;