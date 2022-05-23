//snake constructor
function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  //size of the snake
  this.total = 0;
  this.tail = [];

  //update the snake position
  this.update = function () {
    //when no food has been eaten, the snake just moves forward
    if (this.total === this.tail.length) {
      for (let i = 0; i < this.tail.length - 1; i++) {
        //moving - shifting - every element in the array down in one
        this.tail[i] = this.tail[i + 1];
      }
    }

    //the last spot in the array is the head
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    //constrain the snake to the canvas
    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  };

  //check if the snake hits itself and die
  this.death = function () {
    for (let i = 0; i < this.tail.length; i++) {
      let pos = this.tail[i];
      //check the distance between the head and each other part of the snake
      let d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        console.log("starting over");
        this.total = 0;
        this.tail = [];
        this.x = 0;
        this.y = 0;
      }
    }
  };

  //receive the direction of the snake when the key is pressed
  this.dir = function (x, y) {
    this.xspeed = x;
    this.yspeed = y;
  };

  this.eat = function (pos) {
    //check if the distance between the snake and the food is less than the scale or 1px
    let distance = dist(this.x, this.y, pos.x, pos.y);
    if (distance < 1) {
      return true;
    } else return false;
  };

  //draw and show the snake in the canvas
  this.show = function () {
    fill(255);
    //create one rectangle for each part of the snake
    for (let i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);
  };
}
