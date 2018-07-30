'use strict'
const Rover = require("./lib/rover");
const InputChecker = require("./lib/inputChecker")
const fs = require('fs')

let inputString = '';
process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk !== null) {
        inputString = chunk;
    }
});
// run main when reaches eof
process.stdin.on('end', () => {
    main();
});

function main() {
    let inputList = inputString.trim('\n').split('\n').map(str => str.trim())
    if ((inputList.length % 2) != 1) {
        console.log("Error: Input must be 1 line of terrain top right hand corner coordinate, follow by 2 lines for each rover(one line of location and one line of command)!");
        return;
    }
    let commandList = [];
    let roverList = [];
    for (let i = 0; i < inputList.length; i++) {
        try {
            // the first line of the input
            if (i == 0) {
                let xTerrain;
                let yTerrain;
                [xTerrain, yTerrain] = InputChecker.inputTerrain(inputList[i]);
                // [xTerrain, yTerrain] = inputList[i].split(' ');
                Rover.setTerrain(parseFloat(xTerrain), parseFloat(yTerrain));
            }
            // 2nd line onwards of the input
            else {
                if (i % 2 == 1) {
                    let [x, y, direction] = InputChecker.inputRover(inputList[i]);
                    // let [x, y, direction] = inputList[i].split(' ');
                    // initate rover and set the respective location
                    try {
                        new Rover().setLocation(parseInt(x), parseInt(y), direction);
                    } catch (e) {
                        console.log(e.toString());
                        console.log("Error: line " + i)
                        return;
                    }
                }
                else {
                    commandList.push(inputList[i]);
                }
            }
        }catch(e){
            console.log(e.toString());
            console.log("Error: line " + (i+1));
            break;
        }
    }
    // Pass the command to rovers starting from the 1st rover defined the input file
    roverList = Rover.getRovers();
    for (let i = 0; i < roverList.length; i++) {
        for (let command of commandList[i]) {
            try {
                roverList[i].commandAssign(command);

            } catch (e) {
                console.log(e.toString());
                console.log("Error: line " + (i+1));
            }
        }
    }
    printRoverlocation(Rover.getRovers());
};

/** 
 * Set the top right hand corner of the terrain; the lower left corner is presume to be (0,0)
 * @param {Rover []} roverList The x coordinate of top right hand corner of the terrain
*/
function printRoverlocation(roverList) {
    for (let rover of roverList) {
        let temp = rover.getLocation();
        console.log(temp.join(' '));
    }
}


