angular.module('Rectangular')
.service('ngrInterface',function(ngrWorld){
	
	this.getBodyAtMouse = function(r) {
	  
	  var targetVec = {
	    x: r.worldPosX,
	    y: r.worldPosY
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