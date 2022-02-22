const Potion = require('../lib/Potion');

function Player(name = ''){
    this.name =name;

  this.health = Math.floor(Math.random() * 10 + 95);
  this.strength = Math.floor(Math.random() * 5 + 7);
  this.agility = Math.floor(Math.random() * 5 + 7);
  this.inventory = [new Potion('health'), new Potion()];
}
var tony = new Player("Tony")

// var tony = {
//     name: "Tony",
//     health:  Math.floor(Math.random() * 10 + 95),
//     strength: Math.floor(Math.random() * 5 + 7),
//     agility: Math.floor(Math.random() * 5 + 7)
// }



var tiffany = new Player("Tiffany")
var wendy = new Player("Wendy")

console.table([tony, tiffany, wendy])
module.exports = Player;