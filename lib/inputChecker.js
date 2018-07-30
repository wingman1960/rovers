'use strict'
class InputChecker {
    static inputTerrain(str) {
        let temp = str.split(' ');
        if (temp.length != 2) {
            throw new Error("Terrain input must be in format: Num Num");
        } else if (!Number.isFinite(parseFloat(temp[0])) || !Number.isFinite(parseFloat(temp[1]))) {
            throw new Error("Terrain input must be in format: Num Num");
        } else {
            return str.split(' ');
        }
    }
    static inputRover(str) {
        let temp = str.split(' ');
        if (temp.length != 3) {
            throw new Error("Rover location input must be in format: Num Num String");
        } else if (!Number.isInteger(parseInt(temp[0])) || !Number.isInteger(parseInt(temp[1])) || (temp[2].length != 1) || 'NESW'.indexOf(temp[2]) == -1) {
            throw new Error("Rover location input must be in format: Num Num String ^(N|E|S|W)");
        } else
            return str.split(' ');
    }
}
module.exports = InputChecker;