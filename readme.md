# Prerequisite
### Node.js is the only global dependency for this project. Please ensure the Node.js version installed  = v8.11.1 by

    $ node -v
    v8.11.1

# Quickstart
    $ npm install
    $ npm start --loglevel silent
# Testing
Mocha and Chai are used for unit test and 
Nyc are used for code coverage testing
### To run the unit test and code coverage
    $ npm test
### The Problem


#Assumptions:
The rovers are all unit square with 2 sides paralel to x-axis
The rovers are allow to stay on the boundary
The coordinate given to the rovers are assume to be the centre of the rovers
All the rovers got deployed on the ground at the same time
Coordinates of top right hand corner of the terrain can be float number