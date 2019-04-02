L.RotateImageLayer = L.ImageOverlay.extend({
  _animateZoom: function (e) {
    L.ImageOverlay.prototype._animateZoom.call(this, e);
    var img = this._image;
    img.style[L.DomUtil.TRANSFORM + 'Origin'] = 'center';
    img.style[L.DomUtil.TRANSFORM] += ' rotate(' + this.options.rotation + 'deg)';
  },
  _reset: function () {
    L.ImageOverlay.prototype._reset.call(this);
    var img = this._image;
    img.style[L.DomUtil.TRANSFORM + 'Origin'] = 'center';
    img.style[L.DomUtil.TRANSFORM] += ' rotate(' + this.options.rotation + 'deg)';
  }
});


L.rotateImageLayer = function(url, bounds, options) {
  return new this.RotateImageLayer(url, bounds, options);
};
