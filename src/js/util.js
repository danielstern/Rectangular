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
    r.worldPosX = mousePos.x / SCALE;
    r.worldPosY = mousePos.y / SCALE;
    r.mousePosX = mousePos.x;
    r.mousePosY = mousePos.y;

    _.each(onmoveListeners, function(_listener) {
      _listener(r);
    })


  }, false);

  canvas.addEventListener('mousedown', function(evt) {
    if (event.which == 1 ) {
      var r = {}
      var mousePos = getMousePos(canvas, evt);
      r.worldPosX = mousePos.x / SCALE;
      r.worldPosY = mousePos.y / SCALE;
      r.mousePosX = mousePos.x;
      r.mousePosY = mousePos.y;

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

/*
private function createTriangle(x:Number, y:Number, 
                                width:Number, height:Number, 
                                isDynamic:Boolean, 
                                density:Number = 1, friction:Number = .5, 
                                fixedRotation:Boolean = false, 
                                name:String = ""):b2Body
{
  var bWidth:Number = p2m(width);
  var bHeight:Number = p2m(height);
 
  // shape
  var shape:b2PolygonShape = new b2PolygonShape();
  var vertices:Array = [];
  vertices.push(new b2Vec2(bWidth / 2, bHeight / 2));  // right bottom
  vertices.push(new b2Vec2(-bWidth / 2, bHeight / 2)); // left bottom
  vertices.push(new b2Vec2(0, -bHeight / 2));          // middle top
  shape.SetAsArray(vertices);
 
  // fixture
  var fixture:b2FixtureDef = new b2FixtureDef();
  fixture.density = density;
  fixture.friction = friction;
  fixture.shape = shape;
  fixture.userData = new UserDataInfo(name, bWidth, bHeight);
 
  // body definition
  var bodyDef:b2BodyDef = new b2BodyDef();
  bodyDef.position.Set(p2m(x) + bWidth / 2, p2m(y) + bHeight / 2);
  bodyDef.type = isDynamic ? 
                          b2Body.b2_dynamicBody : b2Body.b2_staticBody;
  bodyDef.fixedRotation = fixedRotation;
 
  // body
  var body:b2Body = ourWorld.CreateBody(bodyDef);
  body.CreateFixture(fixture);
  return body;
}
*/

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
};

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
         s4() + '-' + s4() + s4() + s4();
}