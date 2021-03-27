/*
--- Day 4: The Ideal Stocking Stuffer ---

Santa needs help mining some AdventCoins (very similar to bitcoins) to use as gifts for all the economically forward-thinking little girls and boys.

To do this, he needs to find MD5 hashes which, in hexadecimal, start with at least five zeroes. The input to the MD5 hash is some secret key (your puzzle input, given below) followed by a number in decimal. To mine AdventCoins, you must find Santa the lowest positive number (no leading zeroes: 1, 2, 3, ...) that produces such a hash.

For example:

    If your secret key is abcdef, the answer is 609043, because the MD5 hash of abcdef609043 starts with five zeroes (000001dbbfa...), and it is the lowest such number to do so.
    If your secret key is pqrstuv, the lowest number it combines with to make an MD5 hash starting with five zeroes is 1048970; that is, the MD5 hash of pqrstuv1048970 looks like 000006136ef....

Your puzzle answer was 282749.
--- Part Two ---

Now find one that starts with six zeroes.

Your puzzle answer was 9962624.
*/


const fs = require("fs");
const md5 = require("md5");

const SECRET_KEY = fs.readFileSync('inputs/day04.txt', 'utf8');

// Pt. 1
const LEADING_ZEROS = "00000";
// Pt. 2
// const LEADING_ZEROS = "000000";

let num = 0;

while(true) {
  if (md5(SECRET_KEY + num).startsWith(LEADING_ZEROS)) {
    break;
  }
  num++;
}

console.log(`Answer: ${num}`);

