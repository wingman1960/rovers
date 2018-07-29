'use strict';

// rotation mapping, after some consideration this approach shall be the fastest and less error prone.
const rotateRightMap = { 'N': 'E', 'E': 'S', 'S': 'W', 'W': 'N' };
const rotateLeftMap = { 'N': 'W', 'E': 'N', 'S': 'E', 'W': 'S' };
// static variables
let xTerrain = 0;
let yTerrain = 0;
let roverList = []
class Rover {

  constructor(id) {
    if (id == undefined) this.id = roverList.length
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

  static getRovers() {
    return roverList;
  }
  /**  
   * Set the location of the rover
   * @param {number} x The x coordinate of rover
   * @param {number} y The y coordinate of rover
   * @param {string} direction The direction of rover
  */
  setLocation(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
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
  static checkBoundary(x, y) {
    if (x < 0 || x > this.xTerrain) {
      throw new Error("Rover exceed terrain!");
    }

    if (y < 0 || y > this.yTerrain) {
      throw new Error("Rover exceed terrain!");
    }
  }

  /**  
   * check if the input coordinate has any rovers
   * @param {number} x The x coordinate of the input
   * @param {number} y The y coordinate of the input
  */
  static checkCrash(x, y) {
    for (let rover of roverList) {
      if (rover.getLocation() == [x, y]) {
        throw new Error("Rover: Crashes ahead! stop advancing")
      }
    }
  }

  /**  
   * Advance the rover by one unit in the direction the rover is facing
  */
  advance() {
    switch (this.direction) {
      case 'N':
        this.constructor.checkBoundary(this.x, this.y + 1);
        this.constructor.checkCrash(this.x, this.y + 1);
        this.y += 1;
        break;
      case 'S':
        this.constructor.checkBoundary(this.x, this.y - 1);
        this.constructor.checkCrash(this.x, this.y - 1);
        this.y -= 1;
        break;
      case 'E':
        this.constructor.checkBoundary(this.x + 1, this.y);
        this.constructor.checkCrash(this.x + 1, this.y);
        this.x += 1;
        break;
      case 'W':
        this.constructor.checkBoundary(this.x - 1, this.y);        
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
        this.rotateLeft()
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