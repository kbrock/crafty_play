var Game = {
	WIDTH:  640,
	HEIGHT: 320,

	// BACKGROUND_COLOR: '#FFC187'
	BACKGROUND_COLOR: 'rgba(255, 168, 60, 0.5)',

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

		Crafty.background(Game.BACKGROUND_COLOR);

		Crafty.e('Tree').at(0, 0);
		Crafty.e('Tree').at(0, 1);
		Crafty.e('Tree').at(1, 0);
		Crafty.e('Tree').at(3, 2);

		console.log('-- Game Initialized --');	
	}
}
Game.start = Game.start.bind(Game)
