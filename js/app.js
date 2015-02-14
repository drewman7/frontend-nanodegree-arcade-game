// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';  //Enemy bug sprite
    this.x = 0;  //Initial x coordinate
    this.y = 63;  //Initial y coordinate
    this.dt = getRandomArbitrary(.2, 2);  // Ranom speed parameter
    this.width = 101;  //Set the width of the sprite
    this.height = 83;  //Set the height of the sprite
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // If statement checks to see if the enemy went off the canvas
    if (this.x > ctx.canvas.width) {
        this.x = -101;  // If off the canvas, reset to before the canvas
    } else {
        this.x = this.x + 4*this.dt;  // Sets the speed of the enemy
    };

    // Check if a collision occurs between the player and the enemy
    checkCollisions();
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// player class - our hero
var player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = [
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/enemy-bug.png'
    ];
    this.currentSprintIndex = 0;  // Initiates the index value for the sprite array to 0
    this.x = PLAYER_STARTING_X_COOR;  // Initiates the player's x coordinate
    this.y = PLAYER_STARTING_Y_COOR;  // Initiates the prayer's y coordinate
    this.dt = 40;  // Sets the speed factor
    this.width = 101; // Sets the width of the sprite
    this.height = 83; // Sets the height of the sprite
}

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
player.prototype.update = function(dt) {

}

// Draw the player on the screen, required method for game
player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite[this.currentSprintIndex]), this.x, this.y);

    // If statement checks to see if the player is at the beginning square
    // If so, draws directions at the bottom of the screen
    // If not, the directions disappear
    if (this.x === 202 && this.y === 400) {
        directions();
    }

    scoreBoard();  // Show the scoreboard in upper left corner
    encouragement();  // Show the encouragement banner in the upper right corner

}

// Based on the keystroke entered, moves the player or changes the player avatar
player.prototype.handleInput = function(keyStroke) {
    // If left arrow key hit, move left
   if (keyStroke === 'left') {
        // Stop the player from moving left if player is at the left side of the canvas
        if (this.x - 101 >= 0) {
            this.x = this.x-101;
        };
    };
    // If right arrow key hit, move right
    if (keyStroke === 'right') {
        // Stop the player from moving right if player is at the right side of the canvas
        if (this.x + 101 < ctx.canvas.width) {
            this.x = this.x+101;
        };
    };
    // If up arrow key hit, move up
    if (keyStroke === 'up') {
        // If statement determines if player has reached the water
        if (this.y > 83) {
            this.y = this.y-83;
        } else {
            // If reached the water, resets the player, increments the score, and sets the player encouragement message
            resetPlayer();
            score = score + 1;
            playerSuccess = 'Good job!';
        };
    };
    // If down arrow key hit, move down
    if (keyStroke === 'down') {
        // Stop the player from moving down if player is at the bottom of the canvas
        if (this.y + 83 < ctx.canvas.height - 200) {
            this.y = this.y+83;
        };
    };
    // If space bar hit, change the sprite index to the next
    // This will cycle through the avatars in the player.sprite array
    // If end of the array, goes back to the first avatar
    if (keyStroke === 'space') {
        if (this.currentSprintIndex + 1 === this.sprite.length) {
            this.currentSprintIndex = 0;
        } else {
            this.currentSprintIndex = this.currentSprintIndex + 1;
        };
    };
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Constants for the player's starting x coordinate and y coordinate
var PLAYER_STARTING_X_COOR = 202;
var PLAYER_STARTING_Y_COOR = 400;

// Initialize the enemies
var allEnemies = [
        new Enemy(),
        new Enemy(), 
        new Enemy()
    ];

// Customize the various enemies
// Set second enemy location
allEnemies[1].y = 146;
// Set third enemy location
allEnemies[2].y = 229;


// Initialize the player
var player = new player();
Resources.load(player.sprite); // Load the player sprite array

// Initialize Score and playerSuccess
var score = 0;  // Used to keep score
var playerSuccess = "";  // Used to hold the current encouragement message

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

// Function is used to check if collisions occur
function checkCollisions() {
    // For loop iterates through the enemy array checking whether each enemy has collided with the player
    for (var n = 0; n < allEnemies.length; n++) {
        // If statement determins if the player and enemies have collided by checking to see if the player sprint is in area of the enemy sprite
        if (player.x + 30 > allEnemies[n].x && player.x < allEnemies[n].x + allEnemies[n].width - 30) {
            if (player.y < allEnemies[n].y + 20 && player.y > allEnemies[n].y - 20) {
                resetPlayer();  // Resets the player when it runs into an enemy
                score = score -1;  // Decreases the score when the player hits an enemy
                playerSuccess = 'Sorry, try again!';  // Sets the encouragement message when the player hits the enemy
            };
        };
    };
}

//rest the player's position when reach the water or hit by enemy bug
function resetPlayer() {
    player.x = PLAYER_STARTING_X_COOR;  //player's starting x coordinate
    player.y = PLAYER_STARTING_Y_COOR;  //player's starting y coordinate
}

// Function shows the directions at the bottom of the screen
// This is shown only when the player is on the starting square
function directions() {
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText("Directions:  Use the arrow keys to move your character.  Try to get to the water!", 20, 565);
    ctx.fillText("Press the space bar to change your character.", 20, 580)
}

// Function shows a score in the upper left of the gameboard
function scoreBoard() {
    ctx.font = "bold 24px sans-serif";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "left";
    ctx.fillText("Score:  " + score, 20, 75);
}

// Function shows an message in the upper right of the gameboard if the water is reached or hit by an enemy
function encouragement() {
    ctx.font = "bold 24px sans-serif";
    
    // If statement changes the color of the encouragement message depending if reached the water of hit by an enemy
    if (playerSuccess === "Good job!") {
        ctx.fillStyle = "white";  // White if reached the water
    } else {
        ctx.fillStyle = "red";  // Red if hit by an enemy
    };
    ctx.textAlign = "right";
    ctx.fillText(playerSuccess, 505-20, 75);
}

// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}