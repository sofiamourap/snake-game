class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.next = null;
  }
}

//linked list for the body
class Snake {
  constructor(x, y) {
    this.head = new Node(x, y);
    this.tail = this.head;
    this.xspeed = 1;
    this.yspeed = 0;
  }

  //update the snake position
  update() {
    if (this.head.next) {
      // create a new head
      let newNode = new Node(
        this.head.x + this.xspeed * scl,
        this.head.y + this.yspeed * scl
      );
      newNode.next = this.head;
      this.head = newNode;

      //delete the old tail
      let currentNode = this.head;

      while (currentNode) {
        if (currentNode.next === this.tail) {
          currentNode.next = null;
          this.tail = currentNode;
          break;
        }
        currentNode = currentNode.next;
      }
    } else {
      //move the snake forward when there is just one part
      this.head.x = this.head.x + this.xspeed * scl;
      this.head.y = this.head.y + this.yspeed * scl;
    }

    //constrain the snake to the canvas
    this.head.x = constrain(this.head.x, 0, width - scl);
    this.head.y = constrain(this.head.y, 0, height - scl);
  }

  //grow the snake
  grow() {
    //create a new node
    let newNode = new Node(
      this.head.x + this.xspeed * scl,
      this.head.y + this.yspeed * scl
    );

    //add this new node to the head
    newNode.next = this.head;
    this.head = newNode;
  }

  //check if the snake hits itself and die
  death() {
    //check every node in the list after the head
    let currentNode = this.head.next;
    while (currentNode) {
      let d = dist(this.head.x, this.head.y, currentNode.x, currentNode.y);
      if (d < 1) {
        console.log("starting over");
        this.tail = this.head;
        this.head.next = null;
        this.head.x = 0;
        this.head.y = 0;
        break;
      }
      currentNode = currentNode.next;
    }
  }

  //receive the direction of the snake when the key is pressed
  dir(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  eat(pos) {
    //check if the distance between the snake and the food is less than the scale or 1px
    let distance = dist(this.head.x, this.head.y, pos.x, pos.y);
    if (distance < 1) {
      this.grow();
      return true;
    } else return false;
  }

  //draw and show the snake in the canvas
  show() {
    fill(255);
    //create one rectangle for each part of the snake
    let currentNode = this.head;
    while (currentNode) {
      rect(currentNode.x, currentNode.y, scl, scl);
      currentNode = currentNode.next;
    }

    //draw the head
    rect(this.head.x, this.head.y, scl, scl);
  }
}
