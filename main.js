'use strict'
const Rover = require("./rover");
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
    let commandList = [];
    let roverList = [];
    for (let i = 0; i < inputList.length; i++) {
        if (i == 0) {
            let xTerrain;
            let yTerrain;
            [xTerrain, yTerrain] = inputList[i].split(' ');
            Rover.setTerrain(parseInt(xTerrain), parseInt(yTerrain));
        }
        else {
            if (i % 2 == 1) {
                let [x, y, direction] = inputList[i].split(' ');
                // initate rover and set the respective location
                new Rover().setLocation(parseInt(x), parseInt(y), direction);
            }
            else {
                commandList.push(inputList[i]);
            }
        }
    }
    // Pass the command to rovers starting from the 1st rover defined the input file
    roverList = Rover.getRovers();
    for (let i = 0; i < roverList.length; i++) {
        for (let command of commandList[i]) {
            try {
                roverList[i].commandAssign(command);

            } catch (e) {
                console.debug(e)
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


