// TESTS square

describe("Shapes", function () {

  it("is an object", function () {
    var typeOfShapes = (function () {
      return typeof SHAPES;
    }());
    expect(typeOfShapes).toBe("object");
  });

});

describe("A square", function () {

  it("exists", function () {
    var square = SHAPES.square(4);
    expect(square).toBeDefined();
  });

  it("is created with the side length you give it", function () {
    var square = SHAPES.square(3);
    expect(square.sideLength).toBe(3);
  });

});

// TESTS describing a suite of functions operating on triangles

// test the construction of a triangle
describe("Building a triangle", function () {

  it("suceeds if you create it using three side lengths", function () {
    var triangle = SHAPES.triangle([3, 4, 5]);
    expect(triangle).toBeDefined();
  });

  it("fails if you don't create it using three side lengths", function () {

    expect(SHAPES.triangle).toThrow();

    expect(function () {
      SHAPES.triangle([3]);
    }).toThrow(new TypeError("sides argument is a mandatory 3-element array, was actually passed: 3"));

    expect(function () {
      SHAPES.triangle([3, 4]);
    }).toThrow(new TypeError("sides argument is a mandatory 3-element array, was actually passed: 3,4"));


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



(function () {
  (jasmine.getEnv()).execute();
}());