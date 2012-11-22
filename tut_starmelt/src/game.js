


Crafty.c('Box', {
  init: function() {
    this.addComponent('2D, Canvas, Color');

    this.w = 32; // width
    this.h = 32; // height
    this.color('#FF9C9C');
  }
});


Crafty.c("AwesomeBox", {
    /*
     * Setting ready=true is crucial when drawing on the Canvas. Otherwise the "Draw" event will not be triggered.
     */
    ready: true,
    /*
     * Initialize the component.
     */
    init: function() {
        this.addComponent("2D, Canvas, Fourway, Mouse, Tween");

        this.w = 32;
        this.h = 32;
        this.fourway(10);

        this.fade_out = function() {
          this.tween({alpha: 0.0}, 50);
        }

        /*
         * Define an event handler for the 'draw' event.
         * This is where we hook in our custom _draw() method.
         * The 'draw' event is triggered after the 'enterframe' event.
         */
        this.bind("Draw", function(obj) {
            // Pass the Canvas context and the drawing region.
            this._draw(obj.ctx, obj.pos);
        });
        this.bind("EnterFrame", function(e) {
            if (this._alpha < 0.1) {
                this.destroy();
            }
        });
        this.bind("Click", function(e) {
            console.log(arguments);
            this.fade_out()
        });
    },
    /*
     * This is the method that gets called on 'draw' events.
     * It draws a Box on the Canvas context.
     *
     * Theoretically the method can draw anywhere on the Canvas context, but it
     * should only draw in the drawing region that is passed with the 'draw' event.
     *
     * @param ctx The Canvas context
     * @param po The drawing region
     */
    _draw: function(ctx, po) {
        var pos = {_x: po._x + 1, _y: po._y + 1, _w: po._w - 2, _h: po._h -2};

        ctx.fillStyle = this._color;
        ctx.fillRect(pos._x, pos._y, pos._w, pos._h);

        ctx.lineWidth = 1;
        ctx.strokeStyle = this._strokeColor || "rgb(0,0,0)";
        ctx.beginPath();
        ctx.moveTo(pos._x, pos._y);
        ctx.lineTo(pos._x + pos._w, pos._y);
        ctx.lineTo(pos._x + pos._w, pos._y +  pos._h);
        ctx.lineTo(pos._x, pos._y +  pos._h);
        ctx.closePath();
        ctx.stroke();
        ctx.moveTo(pos._x, pos._y);
        ctx.lineTo(pos._x + pos._w, pos._y +  pos._h);
        ctx.stroke();
        ctx.moveTo(pos._x + pos._w, pos._y);
        ctx.lineTo(pos._x, pos._y +  pos._h);
        ctx.stroke();
    },
    makeBox: function(x, y, color, strokeColor) {
        this.attr({x: x, y: y});
        this._color = color;
        if (strokeColor) this._strokeColor = strokeColor;
    }
});

// ====== //
// Scenes //
// ====== //

// The loading screen that will display while our assets load
Crafty.scene("loading", function() {
  // Load takes an array of assets and a callback when complete
  Crafty.load(["assets/crafty-sprite.png"], function() {
    Crafty.scene('main'); //when everything is loaded, run the main scene
  });

  // Black background with some loading text
  // Crafty.background("#FFC187");
  Crafty.background("#A9F4FF");

  Crafty.e("2D, DOM, text").attr({w: 100, h: 20, x: 150, y: 120})
    // .text("Loading")
    .css({"text-align": "center"});
});

// The main screen shows the game's primary components
Crafty.scene('main', function() {
  console.log('== Main ==');
  
  /*
   * Create an entity with Crafty.e(..) that
   *  - can be drawn (2D) on a HTML canvas (Canvas)
   *  - has a background color (Color)
   *  - can be moved with WASD or arrow keys (Fourway)
   */
  var pl = Crafty.e("2D, Canvas, Color, Fourway")
             .attr({x: 60, y: 66, w: 32, h: 32}) // for Component 2D
             .color("#FF9C9C") // for Component Color
             .fourway(10); // for Component Fourway

  console.log(pl);

  var box1 = Crafty.e('Fourway, Box')
              .attr({x: 120, y: 66, w: 32, h: 32}) // for Component 2D
              .fourway(10); // for Component Fourway

  var abox1 = Crafty.e('Fourway, AwesomeBox')
              .attr({x: 60, y: 126, w: 32, h: 32}) // for Component 2D
              .fourway(10); // for Component Fourway

  var abox2 = Crafty.e('AwesomeBox').makeBox(180,  66, '#0FF')
  var abox3 = Crafty.e('AwesomeBox').makeBox(180, 126, '#0FF',    'rgb(60,60,100)')
  var abox4 = Crafty.e('AwesomeBox').makeBox( 60, 230, '#0FF',    '#050')
  var abox5 = Crafty.e('AwesomeBox').makeBox(180, 230, '#277', '#020')
});

window.onload = function() {

  // Start crafty
  Crafty.init(400, 320);

  // Crafty.canvas();

  // Turn the sprite map into usable components
  Crafty.sprite(16, 'assets/crafty-sprite.png', {
    grass1: [0,0],
    grass2: [1,0],
    grass3: [2,0],
    grass4: [3,0],
    flower: [0,1],
    bush1:  [0,2],
    bush2:  [1,2],
    player: [0,3]
  });
  
  // Automatically play the loading scene
  Crafty.scene('loading');
};

// window.onload = function() {
//   //start crafty
//   Crafty.init(600, 300);
//   Crafty.background('rgb(127,127,127)');
// 
//   //Paddles
//   Crafty.e("Paddle, 2D, DOM, Color, Multiway")
//   	.color('rgb(255,0,0)')
//   	.attr({ x: 20, y: 100, w: 10, h: 100 })
//   	.multiway(4, { W: -90, S: 90 });
//   Crafty.e("Paddle, 2D, DOM, Color, Multiway")
//   	.color('rgb(0,255,0)')
//   	.attr({ x: 580, y: 100, w: 10, h: 100 })
//   	.multiway(4, { UP_ARROW: -90, DOWN_ARROW: 90 });
// 
//   //Ball
//   Crafty.e("2D, DOM, Color, Collision")
//   	.color('rgb(0,0,255)')
//   	.attr({ x: 300, y: 150, w: 10, h: 10, 
//   			dX: Crafty.math.randomInt(2, 5), 
//   			dY: Crafty.math.randomInt(2, 5) })
//   	.bind('EnterFrame', function () {
//   		//hit floor or roof
//   		if (this.y <= 0 || this.y >= 290)
//   			this.dY *= -1;
// 
//   		if (this.x > 600) {
//   			this.x = 300;
//   			Crafty("LeftPoints").each(function () { 
//   				this.text(++this.points + " Points") });
//   		}
//   		if (this.x < 10) {
//   			this.x = 300;
//   			Crafty("RightPoints").each(function () { 
//   				this.text(++this.points + " Points") });
//   		}
// 
//   		this.x += this.dX;
//   		this.y += this.dY;
//   	})
//   	.onHit('Paddle', function () {
//   	this.dX *= -1;
//   })
// 
//   //Score boards
//   Crafty.e("LeftPoints, DOM, 2D, Text")
//   	.attr({ x: 20, y: 20, w: 100, h: 20, points: 0 })
//   	.text("0 Points");
//   Crafty.e("RightPoints, DOM, 2D, Text")
//   	.attr({ x: 515, y: 20, w: 100, h: 20, points: 0 })
//   	.text("0 Points");
// };