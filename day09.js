/*
--- Day 9: All in a Single Night ---

Every year, Santa manages to deliver all of his presents in a single night.

This year, however, he has some new locations to visit; his elves have provided him the distances between every pair of locations. He can start and end at any two (different) locations he wants, but he must visit each location exactly once. What is the shortest distance he can travel to achieve this?

For example, given the following distances:

London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141

The possible routes are therefore:

Dublin -> London -> Belfast = 982
London -> Dublin -> Belfast = 605
London -> Belfast -> Dublin = 659
Dublin -> Belfast -> London = 659
Belfast -> Dublin -> London = 605
Belfast -> London -> Dublin = 982

The shortest of these is London -> Dublin -> Belfast = 605, and so the answer is 605 in this example.

What is the distance of the shortest route?

Your puzzle answer was 141.
--- Part Two ---

The next year, just to show off, Santa decides to take the route with the longest distance instead.

He can still start and end at any two (different) locations he wants, and he still must visit each location exactly once.

For example, given the distances above, the longest route would be 982 via (for example) Dublin -> London -> Belfast.

What is the distance of the longest route?

Your puzzle answer was 736.
*/

const fs = require("fs");

let input = fs.readFileSync('inputs/day09.txt', 'utf8');
input = input.split("\n");

let rtInfo = {};
let citiesList = [];

for (let line of input) {
  line = line.split(" ");
  let city1 = line[0];
  let city2 = line[2];
  let distance = line[4];

  if (!rtInfo[city1]) {
    rtInfo[city1] = {};
  }
  rtInfo[city1][city2] = parseInt(distance);

  if (!rtInfo[city2])  {
    rtInfo[city2] = {};
  }
  rtInfo[city2][city1] = parseInt(distance);

  if (!citiesList.includes(city1)) {
    citiesList.push(city1);
  }
  if (!citiesList.includes(city2)) {
    citiesList.push(city2);
  }
}

let citiesListPermutations = getAllPermutations(citiesList);

let minDistance = Infinity;
let maxDistance = -Infinity;

for (let perm of citiesListPermutations) {
  let distance = 0;
  for (let i = 0; i < perm.length - 1; i++) {
    distance += rtInfo[perm[i]][perm[i + 1]];
  }
  if (distance < minDistance) {
    minDistance = distance
  }
  if (distance > maxDistance) {
    maxDistance = distance;
  }
}

// Pt. 1
console.log(`Answer: ${minDistance}`);
// Pt. 2
console.log(`Answer: ${maxDistance}`);


function getAllPermutations(list) {
  if (list.length === 1) {
    return [list];
  }

  let perms = [];
  for (let i = 0; i < list.length; i++) {
    let curr = list[i];
    let remaining = getAllPermutations(list.slice(0, i).concat(list.slice(i + 1, list.length)));
    for (let perm of remaining) {
      perms.push([curr, ...perm]);
    }
  }

  return perms;
}