/*
--- Day 7: Some Assembly Required ---

This year, Santa brought little Bobby Tables a set of wires and bitwise logic gates! Unfortunately, little Bobby is a little under the recommended age range, and he needs help assembling the circuit.

Each wire has an identifier (some lowercase letters) and can carry a 16-bit signal (a number from 0 to 65535). A signal is provided to each wire by a gate, another wire, or some specific value. Each wire can only get a signal from one source, but can provide its signal to multiple destinations. A gate provides no signal until all of its inputs have a signal.

The included instructions booklet describes how to connect the parts together: x AND y -> z means to connect wires x and y to an AND gate, and then connect its output to wire z.

For example:

    123 -> x means that the signal 123 is provided to wire x.
    x AND y -> z means that the bitwise AND of wire x and wire y is provided to wire z.
    p LSHIFT 2 -> q means that the value from wire p is left-shifted by 2 and then provided to wire q.
    NOT e -> f means that the bitwise complement of the value from wire e is provided to wire f.

Other possible gates include OR (bitwise OR) and RSHIFT (right-shift). If, for some reason, you'd like to emulate the circuit instead, almost all programming languages (for example, C, JavaScript, or Python) provide operators for these gates.

For example, here is a simple circuit:

123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i

After it is run, these are the signals on the wires:

d: 72
e: 507
f: 492
g: 114
h: 65412
i: 65079
x: 123
y: 456

In little Bobby's kit's instructions booklet (provided as your puzzle input), what signal is ultimately provided to wire a?

Your puzzle answer was 3176.
--- Part Two ---

Now, take the signal you got on wire a, override wire b to that signal, and reset the other wires (including wire a). What new signal is ultimately provided to wire a?

Your puzzle answer was 14710.
*/

const fs = require('fs');

let input = fs.readFileSync('inputs/day07.txt', 'utf8');
input = input.split("\n");

let wires = {};

while (!wires['a']) {
  for (let line of input) {
    line = line.split(" -> ");
    let left = line[0];
    let right = line[1];
  
    if (wires[right]) {
      continue;
    }
  
    if (left.includes("AND")) {
      let operands = left.split(" AND ");
      let op1 = wires[operands[0]] !== undefined ? wires[operands[0]] : parseInt(operands[0]);
      let op2 = wires[operands[1]] !== undefined ? wires[operands[1]] : parseInt(operands[1]);
      if (Number.isInteger(op1) && Number.isInteger(op2)) {
        wires[right] = op1 & op2;
      }
    } else if (left.includes("OR")) {
      let operands = left.split(" OR ");
      let op1 = wires[operands[0]] !== undefined ? wires[operands[0]] : parseInt(operands[0]);
      let op2 = wires[operands[1]] !== undefined ? wires[operands[1]] : parseInt(operands[1]);
      if (Number.isInteger(op1) && Number.isInteger(op2)) {
        wires[right] = op1 | op2;
      }
    } else if (left.includes("LSHIFT")) {
      let operands = left.split(" LSHIFT ");
      let op1 = wires[operands[0]] !== undefined ? wires[operands[0]] : parseInt(operands[0]);
      let op2 = wires[operands[1]] !== undefined ? wires[operands[1]] : parseInt(operands[1]);
      let myVar = wires['s'];
      if (Number.isInteger(op1) && Number.isInteger(op2)) {
        wires[right] = op1 << op2;
      }
    } else if (left.includes("RSHIFT")) {
      let operands = left.split(" RSHIFT ");
      let op1 = wires[operands[0]] !== undefined ? wires[operands[0]] : parseInt(operands[0]);
      let op2 = wires[operands[1]] !== undefined ? wires[operands[1]] : parseInt(operands[1]);
      if (Number.isInteger(op1) && Number.isInteger(op2)) {
        wires[right] = op1 >> op2;
      }
    } else if (left.includes("NOT")) {
      let operand = left.slice(4, left.length);
      let op = wires[operand] !== undefined ? wires[operand] : parseInt(operand);
      if (Number.isInteger(op)) {
        wires[right] = ~op;
      }
    } else {
      let op = wires[left] !== undefined ? wires[left] : parseInt(left);
      if (Object.keys(wires).length > 335) {
        let myVar = op;
      }
      
      if (Number.isInteger(op)) {
        wires[right] = op;
      }
    }
  }
}

console.log(`Answer: ${wires['a']}`);
