/**
 * This function sets up the Enemy object and initializes the variables
 * in the object for each instance.  These are the enemies the player
 * must avoid.
 */
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';  // Enemy bug sprite.
    this.x = 0;                            // Initial x coordinate.
    this.y = 63;                           // Initial y coordinate.
    this.width = 101;                      // Set the width of the sprite.
    this.height = 83;                      // Set the height of the sprite. */
    /**
     * getRandomArbitrary is called to determine a random speedparameter
     * @parm {number} 0.2 Minimum threshold
     * @parm {number} 2 Maximum threshold
     * @return {number} dt Random number between the minimum and maximum 
     *     parameters
     */
    this.dt = getRandomArbitrary(0.2, 2);
};

/** 
 * Update the enemy's position, required method for game.
 * This function is called by the updateEntities function
 * in engine.js.
 * @param {number} dt, a time delta between ticks
 */
Enemy.prototype.update = function (dt) {
    /**
     * If statement checks to see if the enemy went off the canvas.
     * The statement compares the canvas.width to the enemy position x.
     * If the enemy sprite is off the canvas, resets the sprite to before
     * the canvas.  Otherwise it changes the position of the sprite to
     * continue along the x coordinate and setting the speed based on the
     * random dt factor associated with the enemy sprite.
     */
    if (this.x > ctx.canvas.width) {
        this.x = -101;
    } else {
        this.x = this.x + 4 * this.dt;
    };

    /**
     * Calls a function to check if a collision occurs between the player 
     * and the enemy.
     */
    checkCollisions();
};

/**
 * Function draws the enemy on the screen utilizing the drawImage
 * function.  Called by renderEntities (engine.js).
 */
Enemy.prototype.render = function() {
    /**
     * drawImage function renders the sprite on the canvas based on the
     * parameters provided.
     * @param {image} sprite The sprite image of the enemy.
     * @param {number} x The x coordinate of the enemy.
     * @param {number} y The y coordinate of the enemy.
     */
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



/**
 * This function sets up the player object and initializes the variables
 * in the object for each instance.  These are the heros of the game.
 */
var Player = function() {
    /**
     * The sprite used for the hero.  The sprite is setup as an array
     * to allow for the player of the game to change the hero sprite.
     * This is done by pressing the spacebar on the keyboard. The 
     * handleInput function cycles to the next index in the array
     * by changing the currentSpriteIndex.
     */
    this.sprite = [
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/enemy-bug.png'
    ];
    this.currentSpriteIndex = 0;      // Initiates the index value for the sprite array
    this.x = PLAYER_STARTING_X_COOR;  // Initiates the player's x coordinate
    this.y = PLAYER_STARTING_Y_COOR;  // Initiates the prayer's y coordinate
    this.dt = 40;                     // Sets the speed factor.
    this.width = 101;                 // Sets the width of the sprite.
    this.height = 83;                 // Sets the height of the sprite.
};

/** 
 * Update the player's position, required method for game.
 * This function is called by the updateEntities function
 * in engine.js.
 * @param {number} dt, a time delta between ticks
 */
Player.prototype.update = function(dt) {
};

/**
 * Function draws the player on the screen utilizing the drawImage
 * function.  Called by renderEntities (engine.js).
 */
Player.prototype.render = function() {
    /**
     * drawImage function renders the sprite on the canvas based on the
     * parameters provided.
     * @param {image} sprite The sprite image of the player.
     * @param {number} x The x coordinate of the player.
     * @param {number} y The y coordinate of the player.
     */
    ctx.drawImage(Resources.get(this.sprite[this.currentSpriteIndex]), this.x, this.y);
    /**
     * If statement checks to see if the player is at the beginning square.
     * If so, directions for the player of the game appear at the bottom
     * of the screen.  If not, the directions disappear.  This is done by
     * checking the x and y coordinates of the player sprite.  If the in
     * starting position, the directions function is called to paint the
     * directions on the screen.
     */
    if (this.x === 202 && this.y === 400) {
        directions();
    };

    /**
     * scoreBoard function is called to display a scoreboard in the upper
     * left of the game screen.
     *
     * encouragement function is called to post encouragement statements
     * in the upper right corner of the game screen.
     */
    scoreBoard();  
    encouragement();
};

/**
 * Based on the keystroke entered, moves the player or changes the player 
 * sprite.  Player can move up, down, left or right using the arrow keys.
 * Player sprite is changed using the space bar.
 * @param {string} keyStroke This is the key stroke that was set in the 
 *     document.addEventListener function.
 */
Player.prototype.handleInput = function(keyStroke) {
    /** If statement checks if the left arrow key was hit */
   if (keyStroke === 'left') {
        /**
         * If statement checks to see if the x coordinate postion is at the
         * left side of the game canvas.  If not, allows the player to move.
         */
        if (this.x - 101 >= 0) {
            this.x = this.x - 101;            // x coordinate is decremented
        };
    };
    /** If statement checks if the right arrow key was hit */
    if (keyStroke === 'right') {
        /**
         * If statement checks to see if the x coordinate postion is at the
         * right side of the game canvas.  If not, allows the player to move.
         */
        if (this.x + 101 < ctx.canvas.width) {
            this.x = this.x + 101;            // x coordinate is incremented
        };
    };
    /** If statement checks if the up arrow key was hit */
    if (keyStroke === 'up') {
        /**
         * If statement checks to see if the y coordinate postion is at the
         * river.  If not yet, allows the player to move.  Otherwise, 
         * resets the player (via the resetPlayer function), increments 
         * the score, and sets the player encouragement message variable.
         */
        if (this.y > 83) {
            this.y = this.y - 83;             // y coordinate is decremented
        } else {
            /** 
             * Function is called to reset the player back to the starting
             * square.
             */
            resetPlayer();
            score = score + 1;              //Score variable is incremented.
            playerSuccess = 'Good job!';    //Encouragement message.
        };
    };
    /** If statement checks if the down arrow key was hit */
    if (keyStroke === 'down') {
        /**
         * If statement checks to see if the y coordinate postion is at the
         * bottom of the game canvas.  If not, allows the player to move.
         */
        if (this.y + 83 < ctx.canvas.height - 200) {
            this.y = this.y + 83;             // y coordinate is incremented
        };
    };
    /** If the space bar is hit, the sprite index is changed to the next one.
     * This will cycle through the avatars in the player.sprite array.
     * If end of the array, goes back to the first avatar (index).
     */
    if (keyStroke === 'space') {
        if (this.currentSpriteIndex + 1 === this.sprite.length) {
            this.currentSpriteIndex = 0;    //Resets the sprite index
        } else {
            this.currentSpriteIndex = this.currentSpriteIndex + 1;
        };
    };
};


/**
 * Initiates the starting x and y coordinate for the player.
 * @const {number} PLAYER_STARTING_X_COOR This is the starting x coordinate.
 * @const {number} PLAYER_STARTING_Y_COOR This is the starting x coordinate.
 */
var PLAYER_STARTING_X_COOR = 202;
var PLAYER_STARTING_Y_COOR = 400;

/**
 * Initializes the enemy array that contains the enemy objects.
 * Each enemy object is setup using the Enemy function.
 */
var allEnemies = [
        new Enemy(),
        new Enemy(), 
        new Enemy()
    ];

/**
 * Changes the starting initial y coordinate for the second and third 
 * enemy.
 */
allEnemies[1].y = 146;
allEnemies[2].y = 229;


/**
 * Initializes the player object by calling the player function.
 */
var player = new Player();

/**
 * The player sprite array is loaded into the memory by calling
 * the Resources.load function.  This allows for the different player
 * sprites to be accessible during game play.
 * @param {image} sprite The player.sprite array.
 */
Resources.load(player.sprite);

/** 
 * Initialize score and playerSuccess variables. 
 * score is used to keep the score of the game.
 * playerSuccess holds an encouragement message based on how the player is doing.
 */
var score = 0;                              // Used to keep score
var playerSuccess = "";                     // Used to hold the current encouragement message

/**
 * This function listens for key presses and sends the keys to the
 * Player.handleInput() method. 
 */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };
    /**
     * Call the handleInput function for the player using the
     * actual keystroke and allowedKeys.
     */
    player.handleInput(allowedKeys[e.keyCode]);
});

/**
 * Function checks to see if collisions occurred between the player and 
 * enemy sprites.
 */
function checkCollisions() {
    /** 
     * For loop iterates through the enemy array checking whether each 
     * enemy has collided with the player.  Called by enemy.update
     */
    for (var n = 0; n < allEnemies.length; n++) {
        /**
         * If statement determines if the player and enemies have collided by 
         * checking to see if the player sprite is in area of the enemy sprite.
         * It does this by first checking the position of the x coordinate
         * comparted to the enemy sprites.  It then checks the y coordinate.
         * If both are true, it resets teh player, decrements the score, and 
         * sets a 'sorry' encouragement message.
         */
        if (player.x + 30 > allEnemies[n].x && player.x < allEnemies[n].x + allEnemies[n].width - 30) {
            if (player.y < allEnemies[n].y + 20 && player.y > allEnemies[n].y - 20) {
                 /** 
                 * Function is called to reset the player back to the starting
                 * square.
                 */
                resetPlayer();
                score = score -1;                       // Decreases the score
                playerSuccess = 'Sorry, try again!';    // Sets the encouragement message
            };
        };
    };
}

/**
 * Reset the player's position when the water is reached or hit by enemy bug.
 * Called by checkCollisions and player.handleInput
 */
function resetPlayer() {
    player.x = PLAYER_STARTING_X_COOR;      //player's starting x coordinate
    player.y = PLAYER_STARTING_Y_COOR;      //player's starting y coordinate
}

/**
 * Function shows the directions at the bottom of the screen.  This is shown 
 * only when the player is on the starting square. Called by player.render.
 */
function directions() {
    ctx.font = '12px sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';
    ctx.fillText('Directions:  Use the arrow keys to move your character.  Try to get to the water!', 20, 565);
    ctx.fillText('Press the space bar to change your character.', 20, 580);
}

/**
 * Function shows the scoreboard in the upper left of the gameboard. 
 * Called by player.render.
 */
function scoreBoard() {
    ctx.font = 'bold 24px sans-serif';
    ctx.fillStyle = 'yellow';
    ctx.textAlign = 'left';
    ctx.fillText('Score:  ' + score, 20, 75);
}

/**
 * Function shows the encouragement in the upper right of the gameboard. 
 * Called by player.render.
 */
function encouragement() {
    ctx.font = 'bold 24px sans-serif';
    
    /**
     * If statement changes the color of the encouragement message depending 
     * if the water is reached or the player is hit by an enemy.
     */
    if (playerSuccess === 'Good job!') {
        ctx.fillStyle = 'white';            // White if reached the water
    } else {
        ctx.fillStyle = 'red';              // Red if hit by an enemy
    };
    ctx.textAlign = 'right';
    ctx.fillText(playerSuccess, 505-20, 75);
}

/**
 * Returns a random number between min (inclusive) and max (exclusive).
 * called by the enemy object function during the initial setup of the enemy.
 * @param {number} min The minimum number threshold.
 * @param {number} max The maximum number threshold.
 * @return {number} This returns the random number used in the calculation of
 *     the enemy's speed across the screen.
 */
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}