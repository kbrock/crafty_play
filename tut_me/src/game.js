$text_css = { 'font-size': '24px', 'font-family': 'Arial', 'font-weight': 'bold', 'color': 'black', 'text-align': 'center' }

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

		console.log('-- Game Initialized --');	
	}
}
Game.start = Game.start.bind(Game)

Crafty.scene('Loading', function(){
	console.log('== Loading ==');

	Crafty.load(['assets/16x16_overworld.gif'], function(){
	  Crafty.sprite(16, 'assets/16x16_overworld.gif', {
			spr_tree:   [0, 3],
			spr_player: [17, 8],
			spr_item:   [16, 7]
		});

		Crafty.scene('Game');
	})
});

Crafty.scene('Game', function() {
	console.log('== Game ==');

	var game_board   = Crafty.e('GameBoard'),
	    item_counter = Crafty.e('ItemCounter');

	Crafty.bind('ItemCollected', function() {
		if (!Crafty('Item').length) {
			Crafty.scene('Victory');
		}
	});
});

Crafty.scene('Victory', function() {
	console.log('== Victory ==');

	window.victory_text = Crafty.e('2D, DOM, Text')
		.attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
		.text('Victory!')
		.css($text_css)
});
