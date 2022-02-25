const Potion = require('./Potion');
const Character = require('./Character');


class Player extends Character{
  costructor(name = ''){
    super(name);
  
  this.inventory = [new Potion('health'), new Potion()];
  }
}

getStats(){
  return{
    potions:this.inventory.length,
    health:this.health,
    strength:this.strength,
    agility:this.agility
  };
}

getInventory(){
  if (this.inventory.length) {
    return this.inventory;
  }
  return false;
}

  usePotion(index) {
    const potion = this.inventory.splice(index, 1)[0];

    switch (potion.name) {
      case 'agility':
        this.agility += potion.value;
        break;
      case 'health':
        this.health += potion.value;
        break;
      case 'strength':
        this.strength += potion.value;
        break;
    }
  }
}


//inherit propotype methods from Character here:
Player.propotype = Object.create(Character.prototype);
Player.prototype.getStats = function() {
  return {
    potions: this.inventory.length,
    health: this.health,
    strength: this.strength,
    agility: this.agility
  };
};

Player.prototype.getInventory = function() {
  if (this.inventory.length) {
    return this.inventory;
  }
  return false;
  };
};


Player.prototype.addPotion = function(potion){
    this.inventory.push(potion);
};

Player.prototype.usePotion = function(index) {
  const potion = this.getInventory().splice(index, 1)[0];

  switch (potion.name) {
    case 'agility':
      this.agility += potion.value;
      break;
    case 'health':
      this.health += potion.value;
      break;
    case 'strength':
      this.strength += potion.value;
      break;
  }
};

//var tony = new Player("Tony")

// var tony = {
//     name: "Tony",
//     health:  Math.floor(Math.random() * 10 + 95),
//     strength: Math.floor(Math.random() * 5 + 7),
//     agility: Math.floor(Math.random() * 5 + 7)
// }



//var tiffany = new Player("Tiffany")
//var wendy = new Player("Wendy")

//console.table([tony, tiffany, wendy])
module.exports = Player;