angular.module("Rectangular")
.service('ngrCamera',function(ngrLoop){
  var zoom = 1,
  focus = {
    x: 0,
    y: 0
  },
  focusTo = {
    x: 0,
    y: 0
  },
  zoomTo = 0.15,
  focusConstraint,
  zoomConstraint;

  this.getZoom = function() {
    return zoom;
  }

  this.getFocus = function() {
    return focus;
  }


  this.setFocusOffset = function (_off) {
    focusOffset = _off;
  }


  this.constrainFocus = function (focusBox) {

    focusConstraint = focusBox;

  }

  this.constrainZoom = function (zc) {
    zoomConstraint = zc;
  }


  this.setZoom = function (_z, instant) {

    if (_z) zoomTo = _z;

    if (_z && instant) zoom = _z;
  }



  this.setFocus = function (_f, _inst) {
    focusTo = {
      x: _f.x,
      y: _f.y
    };

    if (focusConstraint) {
      if (focusTo.x < focusConstraint.x) focusTo.x = focusConstraint.x;
      if (focusTo.x > focusConstraint.x + focusConstraint.width) focusTo.x = focusConstraint.x + focusConstraint.width;

      if (focusTo.y < focusConstraint.y) focusTo.y = focusConstraint.y;
      if (focusTo.y > focusConstraint.y + focusConstraint.height) focusTo.y = focusConstraint.y + focusConstraint.height;
    }

    if (_inst) focus = {
      x: _f.x,
      y: _f.y
    };
  };

  this.getFocusConstraint = function () {
    return focusConstraint;
  }

  this.getFocus = function () {
    var focusReturn = {
      x: focus.x,
      y: focus.y,
    };

    return focusReturn;
  }

  ngrLoop.addPermanentHook(function updateFocus() {
    var incX = Math.abs(focusTo.x - focus.x) * 0.05;
    if (Math.abs(focusTo.x - focus.x) < incX * 2) {
      focus.x = focusTo.x;
    } else if (focusTo.x > focus.x) {
      focus.x += incX;
    } else {
      focus.x -= incX;
    }

    var incY = Math.abs(focusTo.y - focus.y) * 0.05;

    if (Math.abs(focusTo.y - focus.y) < incY * 2) {

      focus.y = focusTo.y;

    } else if (focusTo.y > focus.y) {
      focus.y += incY;
    } else {
      focus.y -= incY;
    }


    var incZ = Math.abs(zoomTo - zoom) * 0.05;
    if (zoomTo > zoom) {
      zoom += incZ;
    } else {
      zoom -= incZ;
    }

    if (zoomConstraint) {
      if (zoom < zoomConstraint.min) zoom = zoomConstraint.min;
      if (zoom > zoomConstraint.max) zoom = zoomConstraint.max;
    }

  });

})