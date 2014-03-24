angular.module("Rectangular")
.service('ngrGame',function(ngrWorld,ngrLoop,ngrDefaults){

  var w = ngrWorld;
  var g = this;

  this.explode = function (thing) {
    
    if (thing.crumbled) return;
    var posX = thing.GetPosition().x;
    var posY = thing.GetPosition().y;
    var pos = thing.GetPosition();
    var force = thing.options.explosiveness || 100000;
    thing.crumble();

    var numRays = 30;
    while (numRays) {

      var angle = (i / numRays) * Math.PI * 2;
      var rayDir = new b2Vec2(Math.sin(angle) * force, Math.cos(angle) * force);

      var b = w.addElement(ngrDefaults.bullet);

      b.SetPosition(pos);

      b.ApplyForce(rayDir, b.GetWorldCenter());

      numRays--;
    }

  }

  this.turnToCannonball = function(thing, volatility) {
    thing.onimpact(volatility || 1, g.explode);
  }

})