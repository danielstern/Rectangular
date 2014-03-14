angular.module('Rectangular')
  .service('ngrInterface', function(ngrWorld, ngrState) {

    var grabJoint;
    var targeter;
    var i = this;
    var mouseX;
    var mouseY;

    this.enableDrag = function() {
    	targeter = new MouseTargeter($('canvas')[0], ngrState.getScale());
    	targeter.onclick(function(r) {
        mouseX = r.worldPosX;
        mouseY = r.worldPosY;
        console.log("click?",r)
        i.grab(r);
      })
    }

    this.grab = function(r) {
      body = i.getBodyAtMouse(r);
      var state = ngrState.getState();

      targeter.onmove(function(r) {
        if (grabJoint) grabJoint.SetTarget(new b2Vec2(r.worldPosX, r.worldPosY))

      })

      if (body) {

        grabJoint = ngrWorld.pin(body, r);

        $(document).mouseup(function(e) {
          if (grabJoint) ngrWorld.destroyJoint(grabJoint);
          grabJoint = null;
        })
      }
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
