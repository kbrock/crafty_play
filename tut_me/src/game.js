var Game = {
	WIDTH:  640,
	HEIGHT: 320,

	BACKGROUND_COLOR: 'rgba(70, 115, 12, 1.0)',

	map_grid: {
		width:  32,
		height: 24,
		tile:   { width: 16, height: 16 }
	},

  width: function() {
  	return this.map_grid.width * this.map_grid.tile.width;
  },

  height: function() {
  	return this.map_grid.height * this.map_grid.tile.height;
  },

	// This will initialize our game
	start: function() {
		// Start crafty
		Crafty.init(this.width(), this.height());

		Crafty.background(this.BACKGROUND_COLOR);

		Crafty.scene('Loading');
	}
}
Game.start = Game.start.bind(Game)
