let s;
let scl = 20;
let food;

function setup() {
  createCanvas(600, 600);
  s = new Snake(0, 0);
  //slow the frame rate to make the snake slower
  frameRate(10);

  //create the food in a random place in the grid
  pickLocation();
}

//pick foods location
function pickLocation() {
  //devide the width and height of the window into equal parts (using the scale as the unit)
  let cols = floor(width / scl);
  let rows = floor(height / scl);

  // give it a random location - use floor to round down
  food = createVector(floor(random(cols)), floor(random(rows)));

  //expand the food location to the scale
  food.mult(scl);
}

function draw() {
  background(51);
  s.death();
  s.update();
  s.show();

  //if the snake eats the food, create a new food, increase the size of the snake
  if (s.eat(food)) {
    pickLocation();
    s.total++;
  }

  //color and create the food
  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);
}

//grab the key press
function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
}
