'use strict'
const InputChecker = require('../lib/inputChecker');
const chai = require('chai');
const sinon = require('sinon');
chai.should();
let assert = chai.assert;

describe('function inputTerrain', () => {
    it('should throw error', () => {
        assert.throws(function () { InputChecker.inputTerrain('1 E') }, Error, "");
    });
    it('should throw error', () => {
        assert.throws(function () { InputChecker.inputTerrain('1') }, Error, "");
    });
    it('should return str', () => {
        let [x,y] = InputChecker.inputTerrain('1 2')
        x.should.equal('1');
        y.should.equal('2');
    });
})

describe('function inputRover', () => {
    it('should throw error', () => {
        assert.throws(function () { InputChecker.inputRover('1 E 1') }, Error, "");
    });
    it('should throw error', () => {
        assert.throws(function () { InputChecker.inputRover('1 4') }, Error, "");
    });
    it('should return str', () => {
        let [x,y,direction] = InputChecker.inputRover('1 2 E')
        x.should.equal('1');
        y.should.equal('2');
        direction.should.equal('E')
    });
})
