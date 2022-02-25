const inquirer = require('inquirer');
const Enemy = require('../lib/Enemy');
const Player = require('../lib/Player');


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
    this.startNewBattle();
    });
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));
};

Game.prototype.startNewBattle = function (){
    if(this.player.agility > this.currentEnemy.agility){
        this.isPlayerTurn = true;
    }else{
        this.isPlayerTurn = false;
    }
    console.console.log('Your stats are as folows');
    console.table(this.player.getStats());
    console.console.log(this.currentEnemy.getDescription());
};

Game.prototype.battle = function() {
  if (this.isPlayerTurn) {
    inquirer.prompt({
      type: 'list',
      message: 'What would you like to do?',
      name: 'action',
      choices: ['Attack', 'Use potion']
    }).then(({action}) =>{
        if (action === 'Use potion') {
          if (!this.player.getInventory()) {
    console.log("You don't have any potions!");
    return;
  }

  inquirer
    .prompt({
      type: 'list',
      message: 'Which potion would you like to use?',
      name: 'action',
      choices:  this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
    }).then(({ action }) => {
    const potionDetails = action.split(': ');

    this.player.usePotion(potionDetails[0] - 1);
    console.log(`You used a ${potionDetails[1]} potion.`);
  });
  } else {
    const damage = this.currentEnemy.getAttackValue();
    this.player.reduceHealth(damage);

    console.log(`You were attacked by the ${this.currentEnemy.name}`);
    console.log(this.player.getHealth());
  }
});
};

Game.prototype.checkEndOfBattle = function(){
    if (this.player.isAlive() && this.currentEnemy.isAlive()) {
  this.isPlayerTurn = !this.isPlayerTurn;
  this.battle();
}
if (this.isPlayerTurn) {
  inquirer
    .prompt()
    .then(({ action }) => {
      if (action === 'Use potion') {
        if (!this.player.getInventory()) {
          // after player sees their empty inventory...

          return this.checkEndOfBattle();
        }

        inquirer
          .prompt()
          .then(({ action }) => {
            // after player uses a potion...

            this.checkEndOfBattle();
          });
      } else {
        // after player attacks...

        this.checkEndOfBattle();
      }
    });
} else {
  // after enemy attacks...

  this.checkEndOfBattle();
}
else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
  console.log(`You've defeated the ${this.currentEnemy.name}`);

  this.player.addPotion(this.currentEnemy.potion);
  console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);

  this.roundNumber++;

  if (this.roundNumber < this.enemies.length) {
    this.currentEnemy = this.enemies[this.roundNumber];
    this.startNewBattle();
  } else {
    console.log('You win!');
  }else {
  console.log("You've been defeated!");
}
}
};

module.exports = Game;