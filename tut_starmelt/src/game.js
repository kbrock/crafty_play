var Game = {
  WIDTH:      800,
  HEIGHT:     640,
  BOX_WIDTH:  32,
  BOX_HEIGHT: 32,
  BOARD_TOP:  100,
  BOARD_LEFT: 160,
  BOARD_ROWS: 10,
  BOARD_COLS: 16
}

Crafty.c('GameBoard', {
	/* The list of colors used for the game */
	COLORS: ["#F00", "#0F0", "#FF0", "#F0F", "#0FF"],

	/**
	 * Initialisation. Adds components, sets positions, creates the board
	 */
	init: function() {
	  this.addComponent('2D, Canvas, Color');
		this.x = Game.BOARD_LEFT;
		this.y = Game.BOARD_TOP;
		this.w = Game.BOX_WIDTH * Game.BOARD_COLS;
		this.h = Game.BOX_HEIGHT * Game.BOARD_ROWS;
		this.color("#888");
		this._setupBoard(Game.BOARD_LEFT, Game.BOARD_TOP, Game.BOARD_ROWS, Game.BOARD_COLS, Game.BOX_WIDTH, Game.BOX_HEIGHT);
	},

	/**
	 * Set up the board.
	 * The board is an Array of columns, which again is an Array of Boxes.
	 */
	_setupBoard: function(x, y, rows, cols, bw, bh) {
		this._board = [];
		for (var c = 0; c < cols; c++) {
			this._board[c] = [];
			for (var r = 0; r < rows; r++) {
				var that = this;
				var newBox = Crafty.e('AwesomeBox').makeBox(x + c * Game.BOX_WIDTH
											, y + (Game.BOX_HEIGHT * Game.BOARD_ROWS - (r + 1) * Game.BOX_HEIGHT)
											, this.COLORS[Crafty.math.randomInt(0, 4)]
											, function () {
											    // bind to 'this' context!
											    that._clickHandler.apply(that, arguments);
											});
				this._board[c][r] = newBox;
			}
		}
	},

	/**
	 * The callback click handler that is passed to the boxes
	 */
	_clickHandler: function(obj) {
		var aPos = this._translateToArrayPos(obj.x, obj.y);
		console.log(aPos);
	},

	/**
	 * Convert mouse coordinates into board position.
	 * Box (0,0) is in the left bottom corner, while coordinate (0,0) is in the left top!!
	 */
	_translateToArrayPos: function(x, y) {
		return {
			x: Math.floor((x - Game.BOARD_LEFT) / Game.BOX_WIDTH),
			y: (Game.BOARD_ROWS - 1) - Math.floor((y - Game.BOARD_TOP) / Game.BOX_HEIGHT)
		};
	}
});

Crafty.c('AwesomeBox', {
  /*
   * Setting ready: true is crucial when drawing on the Canvas. Otherwise the "Draw" event will not be triggered.
   */
  ready: true,

  /*
   * Initialisation. Adds components, sets positions, binds mouse click handler
   */
  init: function() {
    this.addComponent('2D, Canvas, Color, Mouse, crate');

    this.w = Game.BOX_WIDTH;
    this.h = Game.BOX_HEIGHT;

    this.bind('Click', function(obj) {
      if (this._onClickCallback) this._onClickCallback({
        x: obj.realX,
        y: obj.realY,
        color: this._color
      });
    });
  },

  /*
   * Convenience method for creating new boxes
   * @param x position on the x axis
   * @param y position on the y axis
   * @param color background color
   * @param onClickCallback a callback function that is called for mouse click events
   */
  makeBox: function(x, y, color, onClickCallback) {
    this.attr({x: x, y: y}).color(color);
    this._onClickCallback = onClickCallback;
    return this;
  }
});


// ====== //
// Scenes //
// ====== //

// The loading screen that will display while our assets load
Crafty.scene("loading", function() {
  // Load takes an array of assets and a callback when complete
  Crafty.load(["assets/crafty-sprite.png"], function() {
    Crafty.scene('main'); //when everything is loaded, run the main scene
  });

  // Black background with some loading text
  // Crafty.background("#FFC187");
  Crafty.background("#A9F4FF");

  Crafty.e("2D, DOM, text").attr({w: 100, h: 20, x: 150, y: 120})
    // .text("Loading")
    .css({"text-align": "center"});
});

// The main screen shows the game's primary components
Crafty.scene('main', function() {
	console.log('== Main ==');
  
	// Create the board
	Crafty.e('GameBoard');
});

window.onload = function() {

	// Start crafty
	Crafty.init(Game.WIDTH, Game.HEIGHT);

	/*
	 * Loads the Sprite PNG and create the only sprite 'crate' from it
	 */
	Crafty.sprite(32, 'assets/crate.png', { crate: [0, 0]});
  
	// Automatically play the loading scene
	Crafty.scene('loading');
};
