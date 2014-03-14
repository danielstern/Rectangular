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

  console.log("Mousetargeter...",SCALE);

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


  }, false);


}
