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
    console.log("unfollowing...")
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
    //if (focusConstraint) return;

    //console.log("Setting focus", _f, _inst);

    focusTo = {
      x: _f.x,
      y: _f.y
    };
/*
    if (focusConstraint) {
      if (focusTo.x < focusConstraint.x) focusTo.x = focusConstraint.x;
      if (focusTo.x > focusConstraint.x + focusConstraint.width) focusTo.x = focusConstraint.x + focusConstraint.width;

      if (focusTo.y < focusConstraint.y) focusTo.y = focusConstraint.y;
      if (focusTo.y > focusConstraint.y + focusConstraint.height) focusTo.y = focusConstraint.y + focusConstraint.height;
    }*/

    if (_inst) focus = {
      x: _f.x,
      y: _f.y
    };

  //  updateFocus();
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
/*
    if (state.constrainFocusToRoom) {
      var roomHeightPixels = state.room.height * scale;
      var roomWidthPixels = state.room.width * scale;
      console.log("Constrained...",state.room);

      if (newTranslation.y - canvas.height < -roomHeightPixels) newTranslation.y = -roomHeightPixels + canvas.height;
      if (newTranslation.x + canvas.width > roomWidthPixels) newTranslation.x = roomWidthPixels - canvas.width;
      if (newTranslation.y > 0) newTranslation.y = 0;
      if (newTranslation.x < 0) newTranslation.x = 0;

    }*/
    var incY = Math.abs(focusTo.y - focus.y) * 0.05;

    if (Math.abs(focusTo.y - focus.y) < incY * 2) {

      focus.y = focusTo.y;

    } else if (focusTo.y > focus.y) {
      focus.y += incY;
    } else {
      focus.y -= incY;
    }


    if (focusConstraint) {
      //console.log("Focus constrain check",state)
      //console.log("Constrained",canvas.height, canvas.width);


      var focusConstraintPixelsX = focusConstraint.x * scale;
      var focusConstraintWidthPixels = focusConstraint.width * scale;

      var focusConstraintPixelsY = focusConstraint.y * scale;
      var focusConstraintHeightPixels = focusConstraint.height * scale;

      var canvasHeight = canvas.height();
      var canvasWidth = canvas.width();

      var focusYPixels = focus.y * scale;
      var focusXPixels = focus.x * scale;


  //    console.log("FocusY?",focusTo.y, focusConstraintPixelsY);

      if (focusXPixels  < focusConstraintPixelsX + canvasWidth/2) {
        focus.x = (focusConstraintPixelsX + canvasWidth/2) / scale;
      }
      
      


//      console.log("And now...",focus.y);

   //   if (focus.x * scale + canvas.width < -focusContraintPixelsX) focus.x = focusConstraintPixelsX / scale;
     // if (focus.x * scale + canvas.width > focusContraintPixelsX + focusConstraintWidthPixels) focus.x = focusConstraintPixelsX + focusConstraintWidthPixels/ scale;
      
      //if (focus.y - canvas.height < -roomHeightPixels) focus.y = focusConstraint.y;

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