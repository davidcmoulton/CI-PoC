// Simple code to test BDD with Jasmine.

var SHAPES = SHAPES || {};


/** 
 * Returns a triangle object
 * @type {SHAPES.triangle}
 * @param {Array} sides An array of the 3 side lengths
 * @throws {TypeError} Argument sides must be a 3-element array
 * @returns {triangle}
 */

SHAPES.triangle = function (sides) {
  var _tri;
  if (!sides || !sides.length || sides.length !== 3) {
    throw new TypeError("sides argument is a mandatory 3-element array, was actually passed: " + sides);
  }
  _tri = {};
  _tri.sides = sides;

  return _tri;
};
