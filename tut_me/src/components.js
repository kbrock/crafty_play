Crafty.c('Actor', {
	_width:  16,
	_height: 16,

	init: function() {
		this.requires('2D, Canvas, Grid');

		this.attr({
			x: 0,
			y: 0,
			w: this._width,
			h: this._height
		});

		this.Grid(Game.map_grid);
		this.requires('Collision');
		this.stopOnSolids();
	},

	stopOnSolids: function() {
		this.onHit('Solid', this.stopMovement);
	},

	// Stops the movement
	stopMovement: function() {
		// console.log('Preventing movement');
		this._speed = 0;
		if (this._movement) {
			this.x -= this._movement.x;
			this.y -= this._movement.y;	
		}
	}
});

Crafty.c('Grid', {
	// Define a default grid
	_grid: {
		tile: { width: 1, height: 1 }
	},

	init: function() {},

	// Specify the grid for this entity
	Grid: function(grid) {
		this._grid = grid;
		return this;
	},

	// Locate this entity at the given position on the grid
  at: function(x, y) {
		if (x === undefined && y === undefined) {
			return { x: this.x/this._grid.tile.width, y: this.y/this._grid.tile.height }
		} else {
			this.attr({ x: x * this._grid.tile.width, y: y * this._grid.tile.height });
			return this;
		}
  }
});

Crafty.c('Tree', {
	init: function() {
		this.requires('Actor, Solid, spr_tree');
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

Crafty.c('Village', {
	init: function() {
		this.requires('Actor, spr_village');
	},

  collect: function() {
  	this.destroy();
		Crafty.trigger('VillageVisited', this);
  }
});

Crafty.c('Player', {
	init: function() {
		this.requires('2D, Canvas, Grid, Fourway, SpriteAnimation, spr_player');
		this.Grid(Game.map_grid);
		this.fourway(4);
		this.animate('PlayerMovingUp', 0, 0, 2);
		this.animate('PlayerMovingRight', 0, 1, 2);
		this.animate('PlayerMovingDown', 0, 2, 2);
		this.animate('PlayerMovingLeft', 0, 3, 2);

		this.attr({
			w: Game.map_grid.tile.width,
			h: Game.map_grid.tile.height,
			z: 1
		});

		this.requires('Collision, Actor, Solid');

		this.onHit('Village', this.visitVillage);

		var animation_speed = 8;
		this.bind('NewDirection', function(data) {
			if (data.x > 0) {
				this.animate('PlayerMovingRight', animation_speed, -1);
			} else if (data.x < 0) {
				this.animate('PlayerMovingLeft', animation_speed, -1);
			} else if (data.y > 0) {
				this.animate('PlayerMovingDown', animation_speed, -1);
			} else if (data.y < 0) {
				this.animate('PlayerMovingUp', animation_speed, -1);
			} else {
				this.stop();
			}
		});
	},

	visitVillage: function(data) {
		item = data[0] && data[0].obj
		// console.log('visitVillage');
		// console.log(arguments);
		// console.log('data', data)
		// console.log('item', item)
		item.collect();
	}
});

Crafty.c('ItemCounter', {
	init: function() {
		this.textWidget = Crafty.e('2D, DOM, Text')
			.attr({ x: 24, y: 24, w: 150 })
			.css({ 'font-size': '12px', 'font-weight': 'bold', 'color': 'black' });

		var self = this;

		this.drawCount();

		this.bound_drawcount = this.drawCount.bind(this);
		Crafty.bind('VillageVisited', this.bound_drawcount);
	},

  drawCount: function() {
		this.textWidget.text('Villages left: ' + Crafty('Village').length);
		Crafty.unbind('VillageVisited', this.bound_drawcount);
  }
});

Crafty.c('GameBoard', {
	init: function() {
		// A 2D array to track which tiles have units on them
		this.occupied = new Array(Game.map_grid.width);
	  for (var i = 0; i < Game.map_grid.width; i++) {
	    this.occupied[i] = new Array(Game.map_grid.height);
			for (var y = 0; y < Game.map_grid.height; y++) {
				this.occupied[i][y] = 0;
			}
	  }

		this.setupMap();
	},

	// Lay out all the pieces of the map
	setupMap: function() {

		// Player
		window.player = this.player = Crafty.e('Player').at(5, 5);
		this.occupied[player.at().x][player.at().y] = 1;

		// Trees
		for (var x = 0; x < Game.map_grid.width; x++) {
			for (var y = 0; y < Game.map_grid.height; y++) {
				var place_it = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1 || Math.random() < 0.06
				if (place_it && !this.occupied[x][y]) {
				  Crafty.e('Tree').at(x, y);
					this.occupied[x][y] = 1;
				}
			}
		}

		this.seedVillages();
	},

	// Creates the initial set of villages on the map
	seedVillages: function(max_villages) {
		max_villages = max_villages || 5;
		for (var x = 0; x < Game.map_grid.width; x++) {
			for (var y = 0; y < Game.map_grid.height; y++) {
				var place_it = !(x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1) && Math.random() < 0.02
				if (place_it && !this.occupied[x][y]) {
				  Crafty.e('Village').at(x, y);

					if (Crafty('Village').length >= max_villages) {
						return;
					}
				}
			}
		}
	}
});