/*
--- Day 12: JSAbacusFramework.io ---

Santa's Accounting-Elves need help balancing the books after a recent order. Unfortunately, their accounting software uses a peculiar storage format. That's where you come in.

They have a JSON document which contains a variety of things: arrays ([1,2,3]), objects ({"a":1, "b":2}), numbers, and strings. Your first job is to simply find all of the numbers throughout the document and add them together.

For example:

    [1,2,3] and {"a":2,"b":4} both have a sum of 6.
    [[[3]]] and {"a":{"b":4},"c":-1} both have a sum of 3.
    {"a":[-1,1]} and [-1,{"a":1}] both have a sum of 0.
    [] and {} both have a sum of 0.

You will not encounter any strings containing numbers.

What is the sum of all numbers in the document?

Your puzzle answer was 111754.
--- Part Two ---

Uh oh - the Accounting-Elves have realized that they double-counted everything red.

Ignore any object (and all of its children) which has any property with the value "red". Do this only for objects ({...}), not arrays ([...]).

    [1,2,3] still has a sum of 6.
    [1,{"c":"red","b":2},3] now has a sum of 4, because the middle object is ignored.
    {"d":"red","e":[1,2,3,4],"f":5} now has a sum of 0, because the entire structure is ignored.
    [1,"red",5] has a sum of 6, because "red" in an array has no effect.

Your puzzle answer was 65402.
*/

const fs = require('fs');

let input = JSON.parse(fs.readFileSync('inputs/day12.json', 'utf8'));

let total = getValuesFromObject(input);

console.log(`Answer: ${total}`);

function getValuesFromObject(object, excludeRed = true) {
  if (excludeRed && !Array.isArray(object)) {
    if (Object.values(object).includes("red")) {
      return 0;
    }
  }
  let total = 0;
  if (!Array.isArray(object)) {
    object = Object.values(object)
  }
  for (let value of object) {
    if (typeof value === 'object') {
      total += getValuesFromObject(value);
    } else if (typeof value === 'number') {
      total += value;
    }
  }
  return total;
}

// Pt. 1, getValuesFromObject, excludeRed = false
// Pt. 2, getValuesFromObject, excludeRed = true