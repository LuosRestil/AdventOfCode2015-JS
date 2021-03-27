/*
--- Day 5: Doesn't He Have Intern-Elves For This? ---

Santa needs help figuring out which strings in his text file are naughty or nice.

A nice string is one with all of the following properties:

    It contains at least three vowels (aeiou only), like aei, xazegov, or aeiouaeiouaeiou.
    It contains at least one letter that appears twice in a row, like xx, abcdde (dd), or aabbccdd (aa, bb, cc, or dd).
    It does not contain the strings ab, cd, pq, or xy, even if they are part of one of the other requirements.

For example:

    ugknbfddgicrmopn is nice because it has at least three vowels (u...i...o...), a double letter (...dd...), and none of the disallowed substrings.
    aaa is nice because it has at least three vowels and a double letter, even though the letters used by different rules overlap.
    jchzalrnumimnmhp is naughty because it has no double letter.
    haegwjzuvuyypxyu is naughty because it contains the string xy.
    dvszwmarrgswjxmb is naughty because it contains only one vowel.

How many strings are nice?

Your puzzle answer was 255.
--- Part Two ---

Realizing the error of his ways, Santa has switched to a better model of determining whether a string is naughty or nice. None of the old rules apply, as they are all clearly ridiculous.

Now, a nice string is one with all of the following properties:

    It contains a pair of any two letters that appears at least twice in the string without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa, but it overlaps).
    It contains at least one letter which repeats with exactly one letter between them, like xyx, abcdefeghi (efe), or even aaa.

For example:

    qjhvhtzxzqqjkmpb is nice because is has a pair that appears twice (qj) and a letter that repeats with exactly one letter between them (zxz).
    xxyxx is nice because it has a pair that appears twice and a letter that repeats with one between, even though the letters used by each rule overlap.
    uurcxstgmygtbstg is naughty because it has a pair (tg) but no repeat with a single letter between them.
    ieodomkazucvgmuy is naughty because it has a repeating letter with one between (odo), but no pair that appears twice.

How many strings are nice under these new rules?

Your puzzle answer was 55.
*/

const fs = require('fs');

let input = fs.readFileSync('inputs/day05.txt', 'utf8');

input = input.split("\n");

// Pt. 1

const VOWELS = "aeiou";
const DISALLOWED = ["ab", "cd", "pq", "xy"];

function isNicePt1(str) {
  let vowels = 0;
  let hasDouble = false;
  for (let i = 0; i < str.length; i++) {
    let sub = str.slice(i, i + 2);
    if (DISALLOWED.includes(sub)) {
      return false;
    }
    if (VOWELS.includes(sub[0])) {
      vowels++;
    }
    if (sub[0] === sub[1]) {
      hasDouble = true;
    }
  }
  if (vowels >= 3 && hasDouble) {
    return true;
  }
  return false;
}

let nice = 0;

for (let str of input) {
  if (isNicePt1(str)) {
    nice++;
  }
}

console.log(`Answer: ${nice}`);

// Pt. 2

nice = 0;

function hasSandwich(str) {
  for (let i = 0, j = 3; i < str.length - 1; i++, j++) {
    let sub = str.slice(i, j);
    if (sub[0] === sub?.[2]) {
      return true;
    }
  }
  return false;
}

function hasRepeatPair(str) {
  let pairs = {};
  for (let i = 0; i < str.length - 1; i++) {
    let sub = str.slice(i, i + 2);
    if (pairs[sub]) {
      return sub;
    }
    pairs[sub] = 1;
    // don't count triplets as two pairs
    if (str[i] === str[i + 1] && str[i + 1] === str[i + 2]) {
      i++;
    }
  }
  return false;
}

for (let str of input) {
  if (hasSandwich(str) && hasRepeatPair(str)) {
    nice++;
  }
}

console.log(`Answer: ${nice}`);