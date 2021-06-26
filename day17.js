/*
--- Day 17: No Such Thing as Too Much ---

The elves bought too much eggnog again - 150 liters this time. To fit it all into your refrigerator, you'll need to move it into smaller containers. You take an inventory of the capacities of the available containers.

For example, suppose you have containers of size 20, 15, 10, 5, and 5 liters. If you need to store 25 liters, there are four ways to do it:

    15 and 10
    20 and 5 (the first 5)
    20 and 5 (the second 5)
    15, 5, and 5

Filling all containers entirely, how many different combinations of containers can exactly fit all 150 liters of eggnog?

Your puzzle answer was 1638.
--- Part Two ---

While playing with all the containers in the kitchen, another load of eggnog arrives! The shipping and receiving department is requesting as many containers as you can spare.

Find the minimum number of containers that can exactly fit all 150 liters of eggnog. How many different ways can you fill that number of containers and still hold exactly 150 litres?

In the example above, the minimum number of containers was two. There were three ways to use that many containers, and so the answer there would be 3.

Your puzzle answer was 17.
*/

console.time('exec');
const fs = require('fs');

let input = fs.readFileSync('inputs/day17.txt', 'utf-8').split('\n').map(numString => parseInt(numString)).sort((a, b) => b - a);

const target = 150;

function countTargetCombos(target, nums, steps, stepsMap) {
  if (target <= 0) {
    return [0, stepsMap];
  }
  let total = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      total++;
      stepsMap[steps] = stepsMap[steps] ? stepsMap[steps] + 1 : 1;
      continue;
    }
    total += countTargetCombos(target - nums[i], nums.slice(i + 1, nums.length), steps + 1, stepsMap)[0];
  }
  
  return [total, stepsMap];
}

let ans = countTargetCombos(target, input, 0, {});

console.log(`Answer Pt. 1: ${ans[0]}`);

let stepsMap = ans[1];
let minSteps = Math.min(...Object.keys(stepsMap));

console.log(`Answer Pt. 2: ${stepsMap[minSteps]}`);

console.timeEnd('exec');
