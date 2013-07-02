// The code for triangle. Move to own file once this is running
var SHAPES = SHAPES || {};
SHAPES.triangle = function (sides) {
  var _tri = {};
  if (!sides.length || sides.length !== 3) {
    throw new TypeError("sides argument is a amandatory 3-elelemt array.")
  }
  _tri.sides = sides;

  return _tri;
};

// Tests describing a suite of functions operating on triangles

// test the construction of a triangle
describe("Building a triangle", function () {

  it("exists", function () {
    var triangle = SHAPES.triangle([3, 4, 5]);
    expect(triangle).toBeDefined();
  });

  it("has the sides you create it with", function () {
    var triangle = SHAPES.triangle([3, 4, 5]),
        sides = triangle.sides;
    expect(sides.length).toEqual(3);
    expect(sides).toContain(3);
    expect(sides).toContain(4);
    expect(sides).toContain(5);

  });
});


// test a triangle's properties and methods
describe("A triangle", function () {
  var triangle;

  beforeEach(function () {
    triangle = SHAPES.triangle([3, 4, 5]);
  });
  
  afterEach(function () {
    triangle = null;
  });


  it("has three sides", function () {
    var sides = triangle.sides;
    expect(sides.length).toEqual(3);
  });

});

// describe("A deliberately failing test", function () {
//   it("fails", function () {
//     expect(true).toBe(false);
//   });
// });

(function () {
  (jasmine.getEnv()).execute();
}());