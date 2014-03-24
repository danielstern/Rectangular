angular.module("Rectangular")
.service('ngrGame',function(ngrWorld,ngrLoop,ngrDefaults, $q){

  var w = ngrWorld;
  var g = this;
  var canvas = $('canvas')[0];
  var p = $(canvas).parent();


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


  if (!$('.blocker')[0]) {
    p.append('<div class="blocker"></div>');
    $('.blocker').append('<div class="blocker-inner"></div>');
  }

  var blockerRunning = false;
  var r;

  this.blocker = function() {

    if (blockerRunning) return r.promise;

    r = $q.defer();
    $('.blocker-inner').addClass('slide');
    blockerRunning = true;

    setTimeout(function() {
      r.resolve();
      blockerRunning = false;
    }, 500);

    setTimeout(function() {
      $('.blocker-inner').removeClass('slide');
    }, 1000);

    return r.promise;

  }

  this.turnToCannonball = function(thing, volatility) {
    thing.onimpact(volatility || 1, g.explode);
  }

})