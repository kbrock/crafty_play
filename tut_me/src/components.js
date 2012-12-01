Crafty.c('Actor', {
	_width:  16,
	_height: 16,

	init: function() {
		this.requires('2D, Canvas, Color, Grid');

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
		this.onHit('Solid', this.stop);
	},

	// Stops the movement
	stop: function() {
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
  	this.attr({ x: x * this._grid.tile.width, y: y * this._grid.tile.height });
		return this;
  }
});

Crafty.c('Tree', {
	init: function() {
		this.requires('Actor, Solid');
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

Crafty.c('Item', {
	init: function() {
		this.requires('Actor');
		this.color('#BB5500');
	},

  collect: function() {
  	this.destroy();
		Crafty.trigger('ItemCollected', item);
  }
});

Crafty.c('Player', {
	init: function() {
		this.requires('2D, Canvas, Color, Grid, Fourway');
		this.Grid(Game.map_grid);
		this.fourway(4);
		this.color('rgb(250, 50, 50)');

		this.attr({
			w: Game.map_grid.tile.width,
			h: Game.map_grid.tile.height,
			z: 1
		});

		this.requires('Collision, Actor, Solid');

		this.onHit('Item', this.pickUpItem);
	},

	pickUpItem: function(data) {
		item = data[0] && data[0].obj
		console.log('pickUpItem');
		console.log(arguments);
		console.log('data', data)
		console.log('item', item)
		item.collect();
	}
});

Crafty.c('ItemCounter', {
	init: function() {
		Crafty.bind('ItemCollected', function(e) {
			console.log('e', e);
		})
	},

  drawCount: function() {
		// counterText = Crafty.e('2D, Text').text('hi').attr({ x: 50, y: 50, z: 2 });
		this.textWidget.text(function() { console.log('... ', Crafty('Item').length); return 'Items left: ' + Crafty('Item').length; });
  }
});