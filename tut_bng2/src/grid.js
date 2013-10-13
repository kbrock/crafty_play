Grid = {
    _prototype: function() {
        this.printIt = function() {
            console.log('Hello');
        };
    },

    create: function(config) {
        var obj = _.clone(config);
        obj.prototype = this._prototype;
        return obj;
    },

    occupied: function(x, y) {
        return _.any(_.invoke(Krafty.withComponents('Actor'), 'at'), function(loc) {
            return loc.x === x && loc.y === y;
        });
    }
};
