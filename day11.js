/*
--- Day 11: Corporate Policy ---

Santa's previous password expired, and he needs help choosing a new one.

To help him remember his new password after the old one expires, Santa has devised a method of coming up with a password based on the previous one. Corporate policy dictates that passwords must be exactly eight lowercase letters (for security reasons), so he finds his new password by incrementing his old password string repeatedly until it is valid.

Incrementing is just like counting with numbers: xx, xy, xz, ya, yb, and so on. Increase the rightmost letter one step; if it was z, it wraps around to a, and repeat with the next letter to the left until one doesn't wrap around.

Unfortunately for Santa, a new Security-Elf recently started, and he has imposed some additional password requirements:

    Passwords must include one increasing straight of at least three letters, like abc, bcd, cde, and so on, up to xyz. They cannot skip letters; abd doesn't count.
    Passwords may not contain the letters i, o, or l, as these letters can be mistaken for other characters and are therefore confusing.
    Passwords must contain at least two different, non-overlapping pairs of letters, like aa, bb, or zz.

For example:

    hijklmmn meets the first requirement (because it contains the straight hij) but fails the second requirement requirement (because it contains i and l).
    abbceffg meets the third requirement (because it repeats bb and ff) but fails the first requirement.
    abbcegjk fails the third requirement, because it only has one double letter (bb).
    The next password after abcdefgh is abcdffaa.
    The next password after ghijklmn is ghjaabcc, because you eventually skip all the passwords that start with ghi..., since i is not allowed.

Given Santa's current password (your puzzle input), what should his next password be?

Your puzzle answer was hepxxyzz.
--- Part Two ---

Santa's password expired again. What's the next one?

Your puzzle answer was heqaabcc.
*/

const fs = require('fs');

let password = fs.readFileSync('inputs/day11.txt', 'utf8');

function incrementPassword(password) {
  password = password.split('');
  let indexToIncrement = password.length - 1;
  while (true) {
    if (password[indexToIncrement] === 'z') {
      password[indexToIncrement] = 'a';
      indexToIncrement -= 1;
      if (indexToIncrement === -1) {
        indexToIncrement = password.length - 1;
      }
    } else {
      password[indexToIncrement] = getNextChar(password[indexToIncrement]);
      return password.join('');
    }
  }
}

function getNextChar(char) {
  return String.fromCharCode(char.charCodeAt(0) + 1);
}

function isValid(password) {
  if (hasThreeIncreasing(password) && 
hasTwoDifferentNonoverlappingPairs(password)) {
    return true;
  }
  return false;
}

function hasThreeIncreasing(password) {
  for (let i = 0; i < password.length - 2; i++) {
    if (password[i].charCodeAt(0) === password[i + 1].charCodeAt(0) - 1 && password[i + 1].charCodeAt(0) === password[i + 2].charCodeAt(0) - 1) {
      return true;
    }
  }
  return false;
}

function forbiddenChar(password) {
  const forbiddenChars = ['i', 'o', 'l'];
  for (let char of password) {
    if (forbiddenChars.includes(char)) {
      return password.indexOf(char);
    }
  }
  return null;
}

function hasTwoDifferentNonoverlappingPairs(password) {
  let pairs = 0;
  for (let i = 0; i < password.length - 1; i++) {
    if (password[i] === password[i + 1]) {
      pairs++;
      i++;
    }
  }
  return pairs >= 2;
}

while(true) {
  password = incrementPassword(password);
  let forbiddenCharIndex = forbiddenChar(password);
  if (forbiddenCharIndex) {
    password = password.split('');
    password[forbiddenCharIndex] = getNextChar(password[forbiddenCharIndex]);
    password = password.join('');
  }
  if (isValid(password)) {
    break;
  }
}

console.log(`Answer: ${password}`);

// Pt. 2

while(true) {
  password = incrementPassword(password);
  let forbiddenCharIndex = forbiddenChar(password);
  if (forbiddenCharIndex) {
    password = password.split('');
    password[forbiddenCharIndex] = getNextChar(password[forbiddenCharIndex]);
    password = password.join('');
  }
  if (isValid(password)) {
    break;
  }
}

console.log(`Answer: ${password}`);