'use strict'
var Rover = require("./rover");


process.stdin.setEncoding('utf8');

let inputString=[];
let currentLine = 0;
process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    inputString.push(chunk);
    if (chunk !== null) {
    process.stdout.write(`data: ${chunk}`);
  }
});

process.stdin.on('end', () => {
  process.stdout.write('end');
  main();
});

function readLine() {
    return inputString[currentLine++];
};

function main() {
    let line = readLine()
    let array = line.split()
    console.log(array);
    Rover.setTerrain(5,5);
    console.log(Rover.getTerrain())

};


// var rover1 = new Rover(1);
// rover1.setLocation(1,1,'N')
// console.log (rover1.getLocation())
