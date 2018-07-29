'use strict';

// rotation mapping, after some consideration this approach shall be the fastest and less error prone.
const rotateRightMap = { 'N': 'E', 'E': 'S', 'S': 'W', 'W': 'N' };
const rotateLeftMap = { 'N': 'W', 'E': 'N', 'S': 'E', 'W': 'S' };
// static variables
let xTerrain = 0;
let yTerrain = 0;
let roverList = []
class Rover {

  /** 
   * constructor
   * @param {string} id The id of the rover; default the length of the roverList prior instantiation
  */
  constructor(id) {
    if (id == undefined) this.id = roverList.length.toString();
    else this.id = id;
    roverList.push(this);
  }

  /** 
   * Set the top right hand corner of the terrain; the lower left corner is presume to be (0,0)
   * @param {number} x The x coordinate of top right hand corner of the terrain
   * @param {number} y The y coordinate of top right hand corner of the terrain
  */
  static setTerrain(x, y) {
    xTerrain = x;
    yTerrain = y;
  }

  /**  
   * Return the top right hand corner of the terrain; the lower left corner is presume to be (0,0)
  */
  static getTerrain() {
    return [xTerrain, yTerrain];
  }

  /**  
   * Return the list of rovers initiated
  */
  static getRovers() {
    return roverList;
  }

  /**  
   * reset the list of rovers to empty
  */
  static deleteRovers(){
    roverList = [];
  }

  /**  
   * Set the location of the rover
   * @param {number} x The x coordinate of rover
   * @param {number} y The y coordinate of rover
   * @param {string} direction The direction of rover
  */
  setLocation(x, y, direction) {
    if (Number.isInteger(x) && Number.isInteger(y) && !this.constructor.checkOutTerrain(x,y)){
      this.x = x;
      this.y = y;
    } else {
      throw new Error (" Rover setLocation: location coordinate must be interger!")
    }
    if (direction == 'N' || direction == 'E' || direction == 'S' || direction == 'W'){
      this.direction = direction;
    } else {
      throw new Error (" Rover setLocation: direction must be either 'N','E','W' or 'S'!")
    }
  }

  /**  
   * Get the current location of the rover
   */
  getLocation() {
    return [this.x, this.y, this.direction];
  }

  /**  
   * Check if the input coordinates out of the terrain
   * @param {number} x The x coordinate of the input
   * @param {number} y The y coordinate of the input
   */
  static checkOutTerrain(x, y) {
    if (x < 0 || x > xTerrain || y < 0 || y > yTerrain) {
      throw new Error("Rover exceed terrain!");
    }
    return false;
  }

  /**  
   * check if the input coordinate has any rovers
   * @param {number} x The x coordinate of the input
   * @param {number} y The y coordinate of the input
  */
  static checkCrash(x, y) {
    for (let rover of roverList) {
      let [xRover, yRover, dirRover] = rover.getLocation();
      if (xRover == x && yRover == y) {
        throw new Error("Rover: Crashes ahead! stop advancing")
      }
    }
    return false;
  }

  /**  
   * Advance the rover by one unit in the direction the rover is facing
  */
  advance() {
    switch (this.direction) {
      case 'N':
        this.constructor.checkOutTerrain(this.x, this.y + 1);
        this.constructor.checkCrash(this.x, this.y + 1);
        this.y += 1;
        break;
      case 'S':
        this.constructor.checkOutTerrain(this.x, this.y - 1);
        this.constructor.checkCrash(this.x, this.y - 1);
        this.y -= 1;
        break;
      case 'E':
        this.constructor.checkOutTerrain(this.x + 1, this.y);
        this.constructor.checkCrash(this.x + 1, this.y);
        this.x += 1;
        break;
      case 'W':
        this.constructor.checkOutTerrain(this.x - 1, this.y);        
        this.constructor.checkCrash(this.x - 1, this.y);
        this.x -= 1;
        break;
    }
  }

  /**  
   * Rotate the robot to left (anti-clockwise)
  */
  rotateLeft() {
    this.direction = rotateLeftMap[this.direction];
  }

  /**  
   * Rotate the robot to right (clockwise)
  */
  rotateRight() {
    this.direction = rotateRightMap[this.direction];
  }

  /**  
   * Pass the command to the rover
   * @param {string} command 
  */
  commandAssign(command) {
    switch (command) {
      case 'R':
        this.rotateRight();
        break;
      // this.direction = rotateRightMap[this.direction];
      case 'L':
        this.rotateLeft();
        break;
      // this.direction = rotateLeftMap[this.direction];
      case 'M':
        this.advance();
        break;
      default:
        throw new Error("Rover: invalid command, expecting 'R','L' or 'M'")
    }
  }
}
module.exports = Rover;