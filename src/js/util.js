function MouseTargeter(_canvas, scale) {

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  var canvas = _canvas;
  var context;
  var SCALE = scale;

  var onmoveListeners = [];
  var onclicklisteners = [];

  console.log("Mousetargeter...", SCALE);

  this.onmove = function(listener) {
    onmoveListeners.push(listener);
  }

  this.onclick = function(listener) {
    onclicklisteners.push(listener);
  }

  context = canvas.getContext('2d');
  canvas.addEventListener('mousemove', function(evt) {
    var r = {}
    var mousePos = getMousePos(canvas, evt);
    // var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    // console.log(canvas, message);
    r.worldPosX = mousePos.x / SCALE;
    r.worldPosY = mousePos.y / SCALE;
    r.mousePosX = mousePos.x;
    r.mousePosY = mousePos.y;
    //        console.log(mousePos.x, mousePos.y, "-", worldPosX, worldPosY);
    //console.log(r);

    _.each(onmoveListeners, function(_listener) {
      _listener(r);
    })


  }, false);

  canvas.addEventListener('mousedown', function(evt) {
    if (event.which == 1) {
      var r = {}
      var mousePos = getMousePos(canvas, evt);
      // var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
      // console.log(canvas, message);
      r.worldPosX = mousePos.x / SCALE;
      r.worldPosY = mousePos.y / SCALE;
      r.mousePosX = mousePos.x;
      r.mousePosY = mousePos.y;
      //        console.log(mousePos.x, mousePos.y, "-", worldPosX, worldPosY);
      //console.log(r);

      _.each(onclicklisteners, function(_listener) {
        _listener(r);
      })


    }
  }, false);


}

/**
 * Overwrites default Mousetrap.bind method to optionally accept
 * an object to bind multiple key events in a single call
 *
 * You can pass it in like:
 *
 * Mousetrap.bind({
 *     'a': function() { console.log('a'); },
 *     'b': function() { console.log('b'); }
 * });
 *
 * And can optionally pass in 'keypress', 'keydown', or 'keyup'
 * as a second argument
 *
 */
/* global Mousetrap:true */
Mousetrap = (function(Mousetrap) {
    var self = Mousetrap,
        _oldBind = self.bind,
        args;

    self.bind = function() {
        args = arguments;

        // normal call
        if (typeof args[0] == 'string' || args[0] instanceof Array) {
            return _oldBind(args[0], args[1], args[2]);
        }

        // object passed in
        for (var key in args[0]) {
            if (args[0].hasOwnProperty(key)) {
                _oldBind(key, args[0][key], args[1]);
            }
        }
    };

    return self;
}) (Mousetrap);