'use strict';

// rotation mapping, after some consideration this approach shall be the fastest and less error prone.
const rotateRightMap = {'N':'E', 'E':'S', 'S':'W', 'W':'N'};
const rotateLeftMap = {'N':'W', 'E':'N', 'S':'E', 'W':'S'};
// static class variables
let xTerrain = 0;
let yTerrain = 0;

class Rover { 

  constructor(id) {
    this.id = id
  }
  static setTerrain(x,y){
    xTerrain = x;
    yTerrain = y;
  }
  static getTerrain(){
    return [xTerrain,yTerrain];
  }
  setLocation(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }
  getLocation() {
    return [this.x, this.y, this.direction];
  }

  setBoundary(xBoundary, yBoundary) {
    this.xBoundary = xBoundary;
    this.yBoundary = yBoundary;
  }

  getBoundary() {
    return [this.xBoundary, this.yBoundary];
  }

  checkBoundary(x, y) {
    if (x < 0 || x > this.xBoundary) {
      throw new Error("Rover exceed boundary!");
    }

    if (y < 0 || y > this.yBoundary) {
      throw new Error("Rover exceed boundary!");
    }
  }

  advance() {
    switch (this.direction) {
      case 'N':
        this.checkBoundary(this.x, this.y + 1);
        this.y += 1;
      case 'S':
        this.checkBoundary(this.x, this.y - 1);
        this.y -= 1;
      case 'E':
        this.checkBoundary(this.x + 1, this.y);
        this.x += 1;
      case 'W':
        this.checkBoundary(this.x - 1, this.y);
        this.y -= 1;
    }
  }

  rotate(dir){
    switch(dir){
      case 'R':
      this.direction = rotateRightMap[this.direction];
      case 'L':
      this.direction = rotateLeftMap[this.direction];
    }
  }

}
module.exports = Rover;