(function() {
  if (typeof Mario === 'undefined')
    window.Mario = {};

  var Sprite = Mario.Sprite = function(img, pos, size, speed, frames, once) {
    this.pos = pos;
    this.size = size;
    this.speed = speed;
    this._index = 0;
    this.img = img;
    this.once = once;
    this.frames = frames;
  }

  Sprite.prototype.update = function(dt, gameTime) {
    if (gameTime && gameTime == this.lastUpdated) return;
    this._index += this.speed*dt;
    if (gameTime) this.lastUpdated = gameTime;
  }

  Sprite.prototype.setFrame = function(frame) {
    this._index = frame;
  }

  Sprite.prototype.render = function(ctx, posx, posy, vX, vY) {
    var frame;

    if (this.speed > 0) {
      var max = this.frames.length;
      var idx = Math.floor(this._index);
      frame = this.frames[idx % max];

      if (this.once && idx >= max) {
        this.done = true;
        return;
      }
    } else {
      frame = 0;
    }

    var x = this.pos[0];
    var y = this.pos[1];

    x += frame*this.size[0];
    ctx.drawImage(resources.get(this.img), /*start clipping x axis*/ x + (1/3),/*start clipping y axis*/y + (1/3), /*width clipped*/this.size[0] -2/3, /*height clipped*/this.size[1] - (2/3), /*x axis*/Math.round(posx - vX), /*y axis*/Math.round(posy - vY), /*width*/this.size[0],/*width stretch*/this.size[1]);
  } /* This is where the sprite image is drawn and cropped/clipped*/
})();
