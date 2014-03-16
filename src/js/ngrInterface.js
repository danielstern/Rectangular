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
  })
