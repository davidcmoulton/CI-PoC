// Simple code to test BDD with Jasmine.

var SHAPES = SHAPES || {};


/** 
 * Returns a square object
 * @type {SHAPES.square}
 * @param {Number} sideLength The side length of the square
 * @returns {square}
 */

SHAPES.square = function (length) {
  var sq = {};
  sq.sideLength = length;
  return sq;
};