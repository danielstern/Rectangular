angular.module('Rectangular')

.service('ngrInterface', function (ngrWorld, ngrState, ngrCamera) {

  var grabJoint,
    targeter,
    i = this,
    mouseX,
    mouseY,
    last,
    scrollZooming = false,
    onmoveListeners = [],
    onwheelListeners = [],
    onEscapeListeners = [],
    onclickListeners = [];
    mouseupListeners = [];
    grabOnly = false,
    panStartPoint = {},
    panning = false,
    grabbedBody = null;


  this.init = function() {
    targeter = new MouseTargeter($('canvas')[0], ngrState.getScale());

    targeter.onclick(function(){
      _.call(onEscapeListeners);
    })


    Mousetrap.bind(['space', 'enter', 'escape'], function () {
      _.call(onEscapeListeners);
    })


    $('canvas')[0].addEventListener("mousewheel", MouseWheelHandler, false);

    targeter.onclick(function (r) {
      mouseX = r.worldPosX;
      mouseY = r.worldPosY;

    //  i.grab(r);
      r.body = i.getBodyAtMouse(r);

      _.call(onclickListeners, r);
    })

    targeter.onmove(function (r) {
      last = r;
      mouseX = r.worldPosX;
      mouseY = r.worldPosY;
      _.each(onmoveListeners, function (_listener) {
        _listener(r);
      })
    })

    $(document).mouseup(function(){
      //ungrab();
      _.call(mouseupListeners);
    });

  }

  this.onescape = function (l) {
    onEscapeListeners.push(l);
  }

  this.onclick = function (l) {
    onclickListeners.push(l);
  }

  this.onmouseup = function (l) {
    mouseupListeners.push(l);
  }

  this.onwheel = function (l) {
    onwheelListeners.push(l);
  }

  function ungrab(e) {
    panning = false;

    if (grabJoint) ngrWorld.destroyJoint(grabJoint);
    grabJoint = null;
    grabbedBody = null;

  }

  function MouseWheelHandler(e) {

    e.preventDefault();

    _.call(onwheelListeners, e.wheelDelta);
    /*
    var zoomChange;

    if (e.wheelDelta < 0) {
      zoomChange = -0.10;
    } else {
      zoomChange = 0.10;
    }

    if (scrollZooming) {
      var currentZoom = ngrCamera.getZoom();
      ngrCamera.setZoom(currentZoom + zoomChange);
    }
    */

  }

  this.scrollToZoom = function (enable) {
    scrollZooming = enable;
  }

  this.setGrabOnly = function (attr) {
    grabOnly = attr;
  }


  this.onmove = function (listener) {
    onmoveListeners.push(listener);
  }


  this.grab = function (r) {
    body = i.getBodyAtMouse(r);
    

    targeter.onmove(function (r) {
      if (grabJoint) {
        grabJoint.SetTarget(new b2Vec2(r.worldPosX, r.worldPosY))
      } 
    })

    if (body) {
      var grab = true;
      if (grabOnly) {
        if (body.GetUserData() && body.GetUserData()[grabOnly]) {
          grab = true;
        } else {
          grab = false;
        }
      }

      grabbedBody = body;

      _.each(ongrabListeners, function (_listener) {
        _listener(body);
      });

    } else {
      panStartPoint = _.clone(r);
      ngrCamera.unfollow();
      panning = true;
    }
  }

  this.pinToMouse = function (body) {
    var pin = ngrWorld.pin(body, last);
    return pin;

  }

  this.focusToMouse = function () {
    var r = targeter.getInfo();
    var focus = {
      x: r.worldPosX,
      y: r.worldPosY
    };
    ngrCamera.setFocus(focus);
  }

  this.getBodyAtMouse = function (r) {
    var targetVec = {
      x: mouseX,
      y: mouseY
    };
    var pVec = new b2Vec2(targetVec.x, targetVec.y);
    var aabb = new b2AABB();
    aabb.lowerBound.Set(targetVec.x - 0.001, targetVec.y - 0.001);
    aabb.upperBound.Set(targetVec.x + 0.001, targetVec.y + 0.001);

    var targetBody = null;
    var Fixture;

    ngrWorld.getWorld().QueryAABB(function (Fixture) {
      var shape = Fixture.GetShape();
      var Inside = shape.TestPoint(Fixture.GetBody().GetTransform(), pVec);
      if (Inside) {
        targetBody = Fixture.GetBody();
        return false;
      }
      return true;
    }, aabb);
    return targetBody;
  }

  function MouseTargeter(_canvas, scale) {

    function getMousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
    }

    var lastR = undefined;

    var canvas = _canvas;
    var context;
    var SCALE = scale;

    var onmoveListeners = [];
    var onclicklisteners = [];

    this.getInfo = function () {
      return lastR;
    }

    this.onmove = function (listener) {
      onmoveListeners.push(listener);
    }

    this.onclick = function (listener) {
      onclicklisteners.push(listener);
    }

    context = canvas.getContext('2d');

    canvas.addEventListener('mousemove', function (evt) {
      var r = getInfo(evt);

      _.each(onmoveListeners, function (_listener) {
        _listener(r);
      })

    }, false);

    function getInfo(evt) {
      var r = {}
      var zoom = ngrCamera.getZoom();
      var focus = ngrCamera.getFocus();
      var mousePos = getMousePos(canvas, evt);
      r.worldPosX = focus.x + (mousePos.x - 0.5 * canvas.width) / SCALE / zoom;
      r.worldPosY = focus.y + (mousePos.y - 0.5 * canvas.height) / SCALE / zoom;
      r.mousePosX = mousePos.x;
      r.mousePosY = mousePos.y;

      lastR = r;

      return r;

    }

    canvas.addEventListener('mousedown', function (evt) {
      if (event.which == 1) {
        var r = getInfo(evt);

        _.each(onclicklisteners, function (_listener) {
          _listener(r);
        })
      }
    }, false);
  }
})
