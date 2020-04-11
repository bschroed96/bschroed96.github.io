// ========================================== P5.js Boids ===============================================


let boids = [];

function setup() {
  createCanvas(screen.width, 400);

  // Add an initial set of boids into the system
  for (let i = 0; i < 100; i++) {
    boids[i] = new Boid(random(width), random(height));
  }
}

function draw() {
  background(51);
  // Run all the boids
  for (let i = 0; i < boids.length; i++) {
    boids[i].run(boids);
  }
}

// Boid class
// Methods for Separation, Cohesion, Alignment added
class Boid {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = p5.Vector.random2D();
    this.position = createVector(x, y);
    this.r = 3.0;
    this.maxspeed = 3;    // Maximum speed
    this.maxforce = 0.1; // Maximum steering force
  }

  run(boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.render();
  }
  
  // Forces go into acceleration
  applyForce(force) {
    this.acceleration.add(force);
  }
  
  // We accumulate a new acceleration each time based on three rules
  flock(boids) {
    let sep = this.separate(boids); // Separation
    let ali = this.align(boids);    // Alignment
    let coh = this.cohesion(boids); // Cohesion
    // Arbitrarily weight these forces
    sep.mult(2.5);
    ali.mult(1.0);
    coh.mult(1.0);
    // Add the force vectors to acceleration
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }
  
  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset acceleration to 0 each cycle
    this.acceleration.mult(0);
  }
  
  // A method that calculates and applies a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {
    let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force
    return steer;
  }
  
  // Draw boid as a circle
  render() {
    fill(127, 127);
    stroke(200);
    ellipse(this.position.x, this.position.y, 16, 16);
  }
  
  // Wraparound
  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }
  
  // Separation
  // Method checks for nearby boids and steers away
  separate(boids) {
    let desiredseparation = 25.0;
    let steer = createVector(0, 0);
    let count = 0;
    // For every boid in the system, check if it's too close
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.position, boids[i].position);
        diff.normalize();
        diff.div(d); // Weight by distance
        steer.add(diff);
        count++; // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
    }
  
    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }
  
  // Alignment
  // For every nearby boid in the system, calculate the average velocity
  align(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }
  
  // Cohesion
  // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
  cohesion(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0); // Start with empty vector to accumulate all locations
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].position); // Add location
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum); // Steer towards the location
    } else {
      return createVector(0, 0);
    }
  }  
}


// var date = new Date();
// document.getElementById("date").innerHTML = date.getDate() + "/" + date.getMonth()+1 + "/" + date.getFullYear();


// navbar stuff

const a = Math.floor((Math.random() * 200) + 1);
const b = Math.floor((Math.random() * 200) + 1);
const c = Math.floor((Math.random() * 200) + 1);
const d = Math.floor((Math.random() * 200) + 1);
const e = Math.floor((Math.random() * 200) + 1);
const f = Math.floor((Math.random() * 200) + 1);
const g = Math.floor((Math.random() * 200) + 1);
const h = Math.floor((Math.random() * 200) + 1);

console.log(a)
console.log(b)

// randomly place navbar elements
var about = document.getElementById('about');
about.style.position = "absolute";
about.style.left = 200 + a + 'px';
about.style.top = 100 + b + 'px';

var blog = document.getElementById('blog');
blog.style.left = 210 + c + 'px';
blog.style.top = 90 + d + 'px';

var work = document.getElementById('work');
work.style.left = 195 + e + 'px';
work.style.top = 105 + f + 'px';

var home = document.getElementById('home');
home.style.left = 215 + g + 'px';
home.style.top = 80 + h + 'px';



// Create draggable about div
$(function() {
	$("#about").draggable();
});

$(function() {
	$("#blog").draggable();
});

$(function() {
	$("#work").draggable();
});

$(function() {
	$("#home").draggable();
});

// Get user input 

function UserInput() {
	console.log("nums: " + document.getElementById("nums").value);
	return document.getElementById("nums").value;
}


// Algorithm Merge sort
var array = [4, 3, 1, 5, 2];

function MergeSort(list) {
  if (list.length < 2) {
  	return list;
  }
  else {
  	var L = [];
  	var R = [];
  	while (list.length > 1) {
  		L.unshift(list[0]);
  		list.shift();
  		R.unshift(list[0]);
  		list.shift();
  	}
  		if (list.length > 0) {
  			L.unshift(list[0]);
 		 }
 		 L = MergeSort(L);
 		 R = MergeSort(R);
 		 S = [];
 		 while (L.length != 0 && R.length != 0) {
 		 	if (L[0] <= R[0]) {
 		 		S.push(L[0]);
 		 		L.shift();
 		 	}
 		 	else {
 		 		S.push(R[0]);
 		 		R.shift();
 		 	}
 		 }
 		 S = S.concat(L, R);
 		 return S;
  }
}

var sorted = MergeSort(array);
console.log(sorted);


 function myJsFunction(){
    var text=document.getElementById('input1');
    return text;
 }


var inputElement = document.getElementById('bleh');
  var theirInput = '';
  inputElement.addEventListener('change', function(e) {
    theirInput = e.target.value; 
    console.log(theirInput);
  }); 
console.log(theirInput);
console.log(5*theirInput);
