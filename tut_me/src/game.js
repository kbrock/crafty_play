var Game = {
	WIDTH:  640,
	HEIGHT: 320,

	// BACKGROUND_COLOR: '#FFC187'
	BACKGROUND_COLOR: 'rgba(255, 188, 80, 1.0)',

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

		this.setupMap();

		console.log('-- Game Initialized --');	
	},

	// Lay out all the pieces of the map
	setupMap: function() {

		// Player
		this.player = Crafty.e('Player').at(5, 5);

		// Trees
		for (var x = 0; x < this.map_grid.width; x++) {
			for (var y = 0; y < this.map_grid.height; y++) {
				var place_it = x == 0 || x == this.map_grid.width - 1 || y == 0 || y == this.map_grid.height - 1 || Math.random() < 0.06
				if (place_it && !(x == this.player.pos()._x && y == this.player.pos()._y)) {
				  Crafty.e('Tree').at(x, y);
				}
			}
		}
	}
}
Game.start = Game.start.bind(Game)
