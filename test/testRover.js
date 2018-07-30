'use strict'
const Rover = require('../lib/rover');
const chai = require('chai');
const sinon = require('sinon');
chai.should();
let assert = chai.assert;
// global variables
let rover;

afterEach(() => {
    Rover.deleteRovers();
})

describe('function rover constructor', () => {
    it('should return rover id and unempty rover list', () => {
        let rover = new Rover();
        rover.id.should.equal('0');
        Rover.getRovers().length.should.equal(1);
    });
    it('should return rover id and unempty rover list', () => {
        let rover = new Rover('testId');
        let rover2 = new Rover('testId2');
        rover.id.should.equal('testId');
        Rover.getRovers().length.should.equal(2);
    });
})

describe('function getTerrain, setTerrain', () => {
    it('should return input from setTerrain', () => {
        let x = 1;
        let y = 3;
        Rover.setTerrain(x, y);
        let [xTerrain, yTerrain] = Rover.getTerrain();
        xTerrain.should.equal(x);
        yTerrain.should.equal(y);
    });
})

describe('function getLocation, setLocation', () => {
    it('should return input from setLocation', () => {
        Rover.setTerrain(5, 5);
        let rover = new Rover();
        let x = 3;
        let y = 1;
        let direction = 'W'
        rover.setLocation(x, y, direction);
        let [xRover, yRover, dirRover] = rover.getLocation();
        xRover.should.equal(x);
        yRover.should.equal(y);
        dirRover.should.equal(direction);
    });
    it('should throw error when location input is not integer', () => {
        let rover = new Rover();
        let x = 3.1;
        let y = 1;
        let direction = 'W';
        assert.throws(function () { rover.setLocation(x, y, direction) }, Error, "Rover setLocation: location coordinate must be interger!");
    });
    it('should throw error when location input direction is not N E S or W', () => {
        Rover.setTerrain(5, 5);
        let rover = new Rover();
        let x = 3;
        let y = 1;
        let direction = 'A';
        assert.throws(function () { rover.setLocation(x, y, direction) }, Error, "Rover setLocation: direction must be either 'N','E','W' or 'S'!");
    });
})

describe('function checkOutTerrain', () => {
    before(() => {
        Rover.setTerrain(4, 3);
    })
    it('should pass with x y inside terrain', () => {
        Rover.checkOutTerrain(1, 2).should.equal(false);
    });
    it('should throw error with x y exceed terrain', () => {
        assert.throws(function () { Rover.checkOutTerrain(5.1, 5.0) }, Error, "Rover exceed terrain!");
    });
})

describe('function checkCrash', () => {
    beforeEach(() => {
        Rover.setTerrain(10, 10);
        new Rover().setLocation(1, 2, 'N');
    })
    it('should pass with x y not equal rover location', () => {
        Rover.checkCrash(1, 3).should.equal(false);
    });
    it('should throw error with x y equal rover location', () => {
        assert.throws(function () { Rover.checkCrash(1, 2) }, Error, "Rover: Crashes ahead! Stop!");
    });
})

describe('function advance', () => {
    before(() => {
        Rover.setTerrain(10, 10);
    })
    it('should advance forward', () => {
        let rover = new Rover();
        rover.setLocation(1, 2, 'N');
        rover.advance();
        let [x, y, direction] = rover.getLocation();
        x.should.equal(1);
        y.should.equal(3);
        direction.should.equal('N');
    });
    it('should advance forward', () => {
        let rover = new Rover();
        rover.setLocation(1, 2, 'E');
        rover.advance();
        let [x, y, direction] = rover.getLocation();
        x.should.equal(2);
        y.should.equal(2);
        direction.should.equal('E');
    });
    it('should advance forward', () => {
        let rover = new Rover();
        rover.setLocation(1, 2, 'S');
        rover.advance();
        let [x, y, direction] = rover.getLocation();
        x.should.equal(1);
        y.should.equal(1);
        direction.should.equal('S');
    });
    it('should advance forward', () => {
        let rover = new Rover();
        rover.setLocation(1, 2, 'W');
        rover.advance();
        let [x, y, direction] = rover.getLocation();
        x.should.equal(0);
        y.should.equal(2);
        direction.should.equal('W');
    });
})

describe('function rotateRight', () => {
    before(() => {
        Rover.setTerrain(10, 10);
        new Rover().setLocation(1, 2, 'N');
    })
    it('should rotate right', () => {
        let rover = Rover.getRovers()[0];
        rover.rotateRight();
        let [x, y, direction] = rover.getLocation();
        x.should.equal(1);
        y.should.equal(2);
        direction.should.equal('E');
    });
})

describe('function rotateLeft', () => {
    before(() => {
        Rover.setTerrain(10, 10);
        new Rover().setLocation(1, 2, 'N');
    })
    it('should rotate Left', () => {
        let rover = Rover.getRovers()[0];
        rover.rotateLeft();
        let [x, y, direction] = rover.getLocation();
        x.should.equal(1);
        y.should.equal(2);
        direction.should.equal('W');
    });
})

describe('function commandAssign', () => {
    beforeEach(() => {
        Rover.setTerrain(10, 10);
        new Rover().setLocation(1, 2, 'N');
    })
    it('should call advance', () => {
        // replace function with mock stub function
        let rover = new Rover()
        let stub = sinon.stub(rover, 'advance');
        rover.commandAssign('M');
        sinon.assert.calledOnce(stub);
    });
    it('should call rotateLeft', () => {
        // replace funciotn with mock stub function
        let rover = new Rover();
        let stub = sinon.stub(rover, 'rotateLeft');
        rover.commandAssign('L');
        sinon.assert.calledOnce(stub);
    });
    it('should rotateRight', () => {
        // replace funciotn with mock stub function
        let rover = new Rover();
        let stub = sinon.stub(rover, 'rotateRight');
        rover.commandAssign('R');
        sinon.assert.calledOnce(stub);
    });
    it('should throw error', () => {
        let rover = new Rover();
        assert.throws(function () { rover.commandAssign('A') }, Error, "Rover: invalid command, expecting 'R','L' or 'M'");
    });
})