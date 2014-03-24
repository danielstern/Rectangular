angular.module("Rectangular")
.service('ngrCamera',function(ngrLoop, ngrState){
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
  focusConstraint = undefined,
  followHook = undefined,
  c = this,
  zoomConstraint;

  this.getZoom = function() {
    return zoom;
  }

  this.getFocus = function() {
    return focus;
  }


  this.follow = function (body) {
    c.setFocus(body.GetWorldCenter(), true);

    if (followHook) ngrLoop.removeHook(followHook);

    followHook = ngrLoop.addHook(function () {
      var pos = body.GetWorldCenter();
      c.setFocus({
        x: pos.x,
        y: pos.y
      });
    });
  }


  this.unfollow = function () {
    
    ngrLoop.removeHook(followHook);
  }


  this.setFocusOffset = function (_off) {
    focusOffset = _off;
  }


  this.constrainFocus = function (focusBox) {

    //console.log("Constraining...",focusBox,focusConstraint);
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

    //console.error("setting focus")

    focusTo = {
      x: _f.x,
      y: _f.y
    };

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


  ngrLoop.addPermanentHook(updateFocus);

  function updateFocus() {
    var state = ngrState.getState();
    var canvas = state.canvas;
    var scale = ngrState.getScale() * zoom;
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


    if (focusConstraint) {


      var focusConstraintPixelsX = focusConstraint.x * scale;
      var focusConstraintWidthPixels = focusConstraint.width * scale;

      var focusConstraintPixelsY = focusConstraint.y * scale;
      var focusConstraintHeightPixels = focusConstraint.height * scale;

      var canvasHeight = canvas.height();
      var canvasWidth = canvas.width();

      var focusYPixels = focus.y * scale;
      var focusXPixels = focus.x * scale;

      //console.log("Canvas?",canvasHeight,canvasWidth,focusConstraintPixelsX,focusConstraintWidthPixels);


      // we're not allowed to see anything left of the constraint box
      if (focusXPixels  < focusConstraintPixelsX + canvasWidth/2) {
        focus.x = (focusConstraintPixelsX + canvasWidth/2) / scale;
      }

      // we're not allowed to see anything right of the constraint box
      if (focusXPixels  > focusConstraintPixelsX + focusConstraintWidthPixels - canvasWidth/2) {
        focus.x = (focusConstraintPixelsX + focusConstraintWidthPixels - canvasWidth/2) / scale;
      }

      // we're not allowed to see anything above of the constraint box
      if (focusYPixels  < focusConstraintPixelsY + canvasHeight/2) {
        focus.y = (focusConstraintPixelsY + canvasHeight/2) / scale;
      }

      // we're not allowed to see anything below the constraint box
      if (focusYPixels  > focusConstraintPixelsY + focusConstraintHeightPixels - canvasHeight/2) {
        focus.y = (focusConstraintPixelsY + focusConstraintHeightPixels - canvasHeight/2) / scale;
      }

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

  }

})