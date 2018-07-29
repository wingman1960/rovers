'use strict'
var Rover = require("./rover");

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
    console.log(inputList)
    let commandList = [];
    let roverList = [];
    for (let i = 0; i < inputList.length;i++){
        if (i == 0){
            let xTerrain;
            let yTerrain;
            [xTerrain,yTerrain] = inputList[i].split(' ');
            Rover.setTerrain(parseInt(xTerrain), parseInt(yTerrain));
        }
        else{
            if(i % 2 == 1){
                let [x,y,direction] = inputList[i].split(' ');
                // initate rover and set the respective location
                new Rover().setLocation(parseInt(x),parseInt(y),direction);
            }
            else{
                commandList.push(inputList[i]);
            }
        }
    }
    // Pass the command to rovers starting from the 1st rover defined the input file
    roverList = Rover.getRovers();
    console.log(roverList)
    for (let i = 0; i < roverList.length; i++){
        console.log(commandList[i]);
        for( let command of commandList[i]){
            console.log(command)
            roverList[i].commandAssign(command);
            console.log(roverList[i])
        }
    }

    // Rover.setTerrain(5, 5);
    // console.log(Rover.getTerrain())
    console.log(Rover.getRovers())
};


// var rover1 = new Rover(1);
// rover1.setLocation(1,1,'N')
// console.log (rover1.getLocation())
