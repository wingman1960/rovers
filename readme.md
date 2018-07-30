### Quickstart

## Node.js is the only global dependency for this project. Please install ensure node version = 8.11.1 by

    node -v
    npm install
    npm start --loglevel silent
### Testing
Jasmine specs are located alongside the modules they're testing, and follow the naming convention *_spec.js.
To run tests and rerun when files change:

    npm test
### The Problem


#Assumptions:
The rovers are all unit square with 2 sides paralel to x-axis
The rovers are allow to stay on the boundary
The coordinate given to the rovers are assume to be the centre of the rovers
All the rovers got deployed on the ground at the same time
Coordinates of top right hand corner of the terrain can be float number