Crafty.c('Grid', {
	// Define a default grid
	_grid: {
		tile: { width: 1, height: 1 }
	},

	init: function() {},

	// Specify the grid for this entity
	Grid: function(grid) {
		this._grid = grid;
	},

	// Locate this entity at the given position on the grid
  at: function(x, y) {
  	this.attr({ x: x * this._grid.tile.width, y: y * this._grid.tile.height });
  }
});

Crafty.c('Tree', {
	_width:  16,
	_height: 16,

	/**
	 * Initialisation. Adds components, sets positions, binds mouse click handler
	 */
	init: function() {
		this.addComponent('2D, Canvas, Color, Grid');
		this.Grid(Game.map_grid);

		this.attr({
			x: 0,
			y: 0,
			w: this._width,
			h: this._height
		});

		this.color('#215e29');
	},

	Tree: function(opts) {
		_(opts).defaults({
			 x: this.x,
			 y: this.y
		});

		this.attr({ x: opts.x, y: opts.y });

		return this;
	}
});