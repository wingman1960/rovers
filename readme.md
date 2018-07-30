# Rover Code Challenge
## Prerequisite
### Node.js is the only global dependency for this project. Please ensure the Node.js version installed  = v8.11.1 by

    $ node -v
    v8.11.1

## Quickstart

    $ npm install
    $ node main.js < input.txt

where input.txt is the txt file with the following format as stated in the problem:
    
    5 5
    1 2 N
    LMLMLMLMM
    3 3 E
    MMRMMRMRRM

In case if a txt file of output is needed:

    $ node main.js < input.txt > output.txt

## Testing
Lib Mocha and Chai are used for unit testing; \
Lib Sinon is used for mock stub; \
Lib Nyc is used for code coverage testing.
### To run the unit test and code coverage test:

    $ npm test

## The Problem

## Solution explanation:
A classical OOP appoached is employed to tackle the problem in which a Class Rover is defined with each instance acting as each rover input.

A module InputChecker is defined and used for the input format checking. 
In order to be more realistic to the real sinerio, the rover itself is responsible for the command checking, as signal will be interupted in the space of odyssey.

## Error handling:
Currently the program will throw error and stop execution whenever 
1. the input format does not follow the format as stated in the question.
2. any rover exceed the terrain at the time of deployment

In case when a move will make rovers collide or out of terrain, error will be thrown and current rover will stop. The next rover will continue to execute its assigned command.
In order to be more realistic to the real sinerio, the rover itself is responsible for the command checking, as signal will be interupted in the space of odyssey.

#Assumptions:
1. The rovers are all unit square with 2 sides paralel to x-axis
2. The rovers are allow to stay on the boundary
3. The coordinate given to the rovers are assume to be the centre of the rovers
4. All the rovers got deployed on the ground at the same time
5. Coordinates of top right hand corner of the terrain can be float number
6. Since the problem state the the terrain coordiante as "top right hand corner" while (0,0) is "low left hand corner, I assume the input terrain coordinates are non-negative.
