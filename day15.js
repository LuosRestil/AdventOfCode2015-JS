const fs = require('fs');

// let input = fs.readFileSync('inputs/day15.txt', 'utf8').split('\n');

let input = `Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3`.split('\n');

let ingredientInfo = {};

for (let line of input) {
  line = line.split(': ');
  let name = line[0];
  let otherInfo = line[1].split(', ').map(item => item.split(' '));
  ingredientInfo[name] = {};
  for (let info of otherInfo) {
    ingredientInfo[name][info[0]] = parseInt(info[1]);
  }
  ingredientInfo[name].quantity = 25;
}

ingredientInfo.Butterscotch.quantity = 44;
ingredientInfo.Cinnamon.quantity = 56;

let capacity = Object.values(ingredientInfo).map(info => info.capacity * info.quantity).reduce((acc, curr) => acc + curr, 0);
let durability = Object.values(ingredientInfo).map(info => info.durability * info.quantity).reduce((acc, curr) => acc + curr, 0);
let flavor = Object.values(ingredientInfo).map(info => info.flavor * info.quantity).reduce((acc, curr) => acc + curr, 0);
let texture = Object.values(ingredientInfo).map(info => info.capacity * info.quantity).reduce((acc, curr) => acc + curr, 0);

console.log(capacity);
console.log(durability);
console.log(flavor);
console.log(texture);