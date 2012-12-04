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
			.css($text_css);

		Crafty.scene('Game');
	})
});

$show_victory = function() {
	if (!Crafty('Village').length) {
		Crafty.unbind('VillageVisited', $show_victory);
		Crafty.scene('Victory');
		console.log('showing victory');
	}
}

Crafty.scene('Game', function() {
	console.log('== Game ==');

	var game_board   = Crafty.e('GameBoard'),
	    item_counter = Crafty.e('ItemCounter');

	Crafty.bind('VillageVisited', $show_victory);
});

var $restart_game = function() {
	Crafty.unbind('KeyDown', $restart_game);
	Crafty.scene('Game');
	console.log('yep');
}

Crafty.scene('Victory', function() {
	console.log('== Victory ==');

	Crafty.e('2D, DOM, Text')
		.attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
		.text('Victory!')
		.css($text_css)

	Crafty.bind('KeyDown', $restart_game);
});