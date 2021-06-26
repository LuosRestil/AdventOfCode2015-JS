/*
--- Day 18: Like a GIF For Your Yard ---

After the million lights incident, the fire code has gotten stricter: now, at most ten thousand lights are allowed. You arrange them in a 100x100 grid.

Never one to let you down, Santa again mails you instructions on the ideal lighting configuration. With so few lights, he says, you'll have to resort to animation.

Start by setting your lights to the included initial configuration (your puzzle input). A # means "on", and a . means "off".

Then, animate your grid in steps, where each step decides the next configuration based on the current one. Each light's next state (either on or off) depends on its current state and the current states of the eight lights adjacent to it (including diagonals). Lights on the edge of the grid might have fewer than eight neighbors; the missing ones always count as "off".

For example, in a simplified 6x6 grid, the light marked A has the neighbors numbered 1 through 8, and the light marked B, which is on an edge, only has the neighbors marked 1 through 5:

1B5...
234...
......
..123.
..8A4.
..765.

The state a light should have next is based on its current state (on or off) plus the number of neighbors that are on:

    A light which is on stays on when 2 or 3 neighbors are on, and turns off otherwise.
    A light which is off turns on if exactly 3 neighbors are on, and stays off otherwise.

All of the lights update simultaneously; they all consider the same current state before moving to the next.

Here's a few steps from an example configuration of another 6x6 grid:

Initial state:
.#.#.#
...##.
#....#
..#...
#.#..#
####..

After 1 step:
..##..
..##.#
...##.
......
#.....
#.##..

After 2 steps:
..###.
......
..###.
......
.#....
.#....

After 3 steps:
...#..
......
...#..
..##..
......
......

After 4 steps:
......
......
..##..
..##..
......
......

After 4 steps, this example has four lights on.

In your grid of 100x100 lights, given your initial configuration, how many lights are on after 100 steps?

Your puzzle answer was 768.
--- Part Two ---

You flip the instructions over; Santa goes on to point out that this is all just an implementation of Conway's Game of Life. At least, it was, until you notice that something's wrong with the grid of lights you bought: four lights, one in each corner, are stuck on and can't be turned off. The example above will actually run like this:

Initial state:
##.#.#
...##.
#....#
..#...
#.#..#
####.#

After 1 step:
#.##.#
####.#
...##.
......
#...#.
#.####

After 2 steps:
#..#.#
#....#
.#.##.
...##.
.#..##
##.###

After 3 steps:
#...##
####.#
..##.#
......
##....
####.#

After 4 steps:
#.####
#....#
...#..
.##...
#.....
#.#..#

After 5 steps:
##.###
.##..#
.##...
.##...
#.#...
##...#

After 5 steps, this example now has 17 lights on.

In your grid of 100x100 lights, given your initial configuration, but with the four corners always in the on state, how many lights are on after 100 steps?

Your puzzle answer was 781.
*/

console.time('exec');
const fs = require('fs');

let input = fs.readFileSync('inputs/day18.txt', 'utf-8').split('\n').map(row => row.split(""));

function updateLights(grid) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      let neighborsOn = getNeighborsOn(grid, row, col);
      if (grid[row][col] === "#" && (neighborsOn !== 2 && neighborsOn !== 3)) {
        grid[row][col] = "1";
      } else if (grid[row][col] === "." && neighborsOn === 3) {
        grid[row][col] = "0";
      }
    }
  }

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === "1") {
        grid[row][col] = ".";
      }
      if (grid[row][col] === "0") {
        grid[row][col] = "#";
      }
    }
  }

  // uncomment for part 2
  // grid[0][0] = "#";
  // grid[0][grid[0].length - 1] = "#";
  // grid[grid.length - 1][0] = "#";
  // grid[grid.length - 1][grid[0].length - 1] = "#";

}

function getNeighborsOn(grid, row, col) {
  let totalOn = 0;
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (i >= 0 && i < grid.length &&
        j >= 0 && j < grid[0].length &&
        (i !== row || j !== col)) {
        if (grid[i][j] === "#" || grid[i][j] === "1") {
          totalOn++;
        }
      }
    }
  }
  return totalOn;
}

for (let i = 0; i < 100; i++) {
  updateLights(input);
}

let totalOn = 0;
for (let row = 0; row < input.length; row++) {
  for (let col = 0; col < input[0].length; col++) {
    if (input[row][col] === "#") {
      totalOn++;
    }
  }
}

console.log(`Answer: ${totalOn}`);

console.timeEnd('exec');