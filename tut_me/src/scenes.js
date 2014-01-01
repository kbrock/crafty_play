Crafty.scene('Loading', function(){
	console.log('== Loading ==');

	Crafty.load(['assets/16x16_overworld.gif', 'assets/hunter.png'], function(){
	  Crafty.sprite(16, 'assets/16x16_overworld.gif', {
			spr_tree:    [0, 3],
			spr_village: [16, 7]
		});

	  Crafty.sprite(16, 'assets/hunter.png', {
			spr_player:   [0, 0],
		}, 0, 2);

		Crafty.e('2D, DOM, Text')
			.attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
			.text('Loading...')
			.textColor('white')
			.textFont({ "size": '24px', 'family': 'Arial'})
			.css('text-align', 'center');

		Crafty.scene('Game');
	})
});

Crafty.scene('Game', function() {
	console.log('== Game ==');

	this.game_board   = Crafty.e('GameBoard');
	this.item_counter = Crafty.e('ItemCounter');

	this.show_vic = function() {
		if (!Crafty('Village').length) {
			Crafty.scene('Victory');
			// console.log('showing victory');
		}
	}
	this.bind('VillageVisited', this.show_vic);
}, function() {
	this.game_board.destroy();
	this.item_counter.destroy();
	this.unbind('VillageVisited', this.show_vic);
});

Crafty.scene('Victory', function() {
	console.log('== Victory ==');

	Crafty.e('2D, DOM, Text')
		.attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
		.text('Victory!')
		.textColor('white')
		.textFont({ "size": '24px', 'family': 'Arial'})
		.css('text-align', 'center');

	this.restart_game = function() {
		Crafty.scene('Game');
	}
	this.bind('KeyDown', this.restart_game);
}, function() {
	this.unbind('KeyDown', this.restart_game);
});
