const inquirer = require('inquirer');
const Enemy = require('./lib/Enemy.js');
const Player = require('./lib/Player.js');
const Game = require('./lib/Game.js');


new Game().initializeGame();

function Game(){
  this.roundNumber = 0;
  this.isPlayerTurn = false;
  this.enemies = [];
  this.currentEnemy;
  this.player;
}

Game.prototype.initializeGame = function(){
this.currentEnemy = this.enemies[0];
inquirer
  .prompt({
    type:'text',
    name: 'name',
    message: 'What is your name?'  
})
  // destructure name from the prompt object
  .then(({ name }) => {
    this.player = new Player(name);

    // test the object creation
    console.log(this.startNewBattle);
    });
};

this.enemies.push(new Enemy('goblin', 'sword'));
this.enemies.push(new Enemy('orc', 'baseball bat'));
this.enemies.push(new Enemy('skeleton', 'axe'));



module.exports = Game;