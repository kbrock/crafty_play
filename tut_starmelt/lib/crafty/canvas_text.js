/*
 * A Component that draws Text on a Canvas.
 */
Crafty.c('CanvasText', {
	/* Setting ready = true is necessary! It will not be drawn at all otherwise! */
	ready: true,

	/**
	 * CanvasText depends on 2D and Canvas, so add them here in `init`.
	 * Also add a handler for the 'Draw' event which does the actual drawing 
	 * of the Text.
	 */
	init: function() {
		this.addComponent('2D, Canvas');

		this.bind('Draw', function(obj) {
			var ctx = obj.ctx;
			var tx = this.x;
			if (this._align === 'right') tx += this.w;
			if (this._align === 'center') tx += this.w / 2;
			ctx.save();
			ctx.font = this._font;
			ctx.fillStyle = '#000';
			ctx.translate(tx, this.y + this.h);
			ctx.textAlign = this._align;
			ctx.textBaseline = 'bottom';
			ctx.fillText(this._text, 0, 0);
			ctx.restore();
			ctx.stroke();
		});
	},

	/**
	 * Sets the Text.
	 * @param text the Text
	 */
	text: function(text) {
		if(text === null || text === undefined) return this._text;
		this._text = text;
		this.trigger('Change');
		return this;
	},

	/**
	 * Sets the Font.
	 * @param font the Font
	 */
	font: function(font) {
			this._font = font;
			this.trigger('Change');
			return this;
	},

	/**
	 * Sets the Alignment.
	 * @param align the Alignment (left, right, center). Default is left.
	 */
	align: function(align) {
		this._align = align;
		this.trigger('Change');
		return this;
	}
});