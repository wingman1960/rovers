'use strict';

directionMap = {}

class rover {
  constructor(id) {
    this.id = id
  }
  set location(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }
  get location() {
    return [this.x, this.y, this.direction]
  }

  set boundary(xBoundary, yBoundary) {
    this.xBoundary = xBoundary;
    this.yBoundary = yBoundary;
  }

  get boundary() {
    return [this.xBoundary, this.yBoundary];
  }

  checkBoundary(x, y) {
    if (x < 0 || x > this.xBoundary) {
      throw new Error("Rover exceed boundary!")
    }

    if (y < 0 || y > this.yBoundary) {
      throw new Error("Rover exceed boundary!")
    }
  }

  advance() {
    switch (direction) {
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
      // case 'L':
      //   this.direction = none;

    }

  }

}