angular.module('Rectangular')
  .service('ngrInterface', function(ngrWorld, ngrState) {

    var grabJoint;
    var targeter;
    var i = this;
    var mouseX;
    var mouseY;
    var last;
    var onmoveListeners = [];
    var ongrabListeners = [];

    this.enableDrag = function() {
    	targeter = new MouseTargeter($('canvas')[0], ngrState.getScale());
    	targeter.onclick(function(r) {
        mouseX = r.worldPosX;
        mouseY = r.worldPosY;
     //   console.log("click?",r)
        i.grab(r);
      })

      targeter.onmove(function(r){
        last = r;
        mouseX = r.worldPosX;
        mouseY = r.worldPosY;
        _.each(onmoveListeners, function(_listener) {
          _listener(r);
        })
      })
    }

    this.onmove = function(listener) {
      onmoveListeners.push(listener);
    }

    this.ongrab = function(listener) {
      ongrabListeners.push(listener);
    }

    this.grab = function(r) {
      body = i.getBodyAtMouse(r);
      console.log("Grabbing",body,r);
      var state = ngrState.getState();

      targeter.onmove(function(r) {
        if (grabJoint) grabJoint.SetTarget(new b2Vec2(r.worldPosX, r.worldPosY))

      })

      if (body) {

        if (grabJoint) ngrWorld.unpin(grabJoint);
        grabJoint = ngrWorld.pin(body, r);

        _.each(ongrabListeners, function(_listener) {
          _listener(body);
        })

        $(document).mouseup(function(e) {
          if (grabJoint) ngrWorld.destroyJoint(grabJoint);
          grabJoint = null;
        })
      }
    }

    this.pinToMouse = function(body) {
      var pin = ngrWorld.pin(body, last);
      //console.log("pin?",pin);
      return pin;

    }

    this.focusToMouse = function() {
      var r = targeter.getInfo();
      var focus = {
        x:r.worldPosX,
        y:r.worldPosY
      };

      ngrState.setFocus(focus);
    }

    this.getBodyAtMouse = function(r) {

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

      function GetBodyCallback(Fixture) {
        var shape = Fixture.GetShape();
        var Inside = shape.TestPoint(Fixture.GetBody().GetTransform(), pVec);
        if (Inside) {
          targetBody = Fixture.GetBody();
          return false;
        }
        return true;
      }

      ngrWorld.getWorld().QueryAABB(GetBodyCallback, aabb);
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

      this.getInfo = function() {
        return lastR;
      }

      this.onmove = function(listener) {
        onmoveListeners.push(listener);
      }

      this.onclick = function(listener) {
        onclicklisteners.push(listener);
      }

      context = canvas.getContext('2d');

      canvas.addEventListener('mousemove', function(evt) {
        var r = getInfo(evt);

        _.each(onmoveListeners, function(_listener) {
          _listener(r);
        })


      }, false);

      function getInfo(evt) {
        var r = {}
        var zoom = ngrState.getZoom();
        var focus = ngrState.getFocus();
        var mousePos = getMousePos(canvas, evt);
        r.worldPosX = focus.x + (mousePos.x - 0.5*canvas.width) / SCALE / zoom;
        r.worldPosY = focus.y + (mousePos.y - 0.5*canvas.height) / SCALE / zoom;
     //   r.worldPosX = (mousePos.x + 0.5 * canvas.width) / SCALE / zoom;
     //   r.worldPosY = mousePos.y / SCALE * zoom;
        r.mousePosX = mousePos.x;
        r.mousePosY = mousePos.y;

        lastR = r;

        return r;

      }

      canvas.addEventListener('mousedown', function(evt) {
        if (event.which == 1) {
          var r = getInfo(evt);
     

          _.each(onclicklisteners, function(_listener) {
            _listener(r);
          })
        }
      }, false);


    }

  })
