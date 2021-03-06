angular.module('Rectangular')
.service('ngrActor', function(ngrState, ngrCamera) {

  this.newActor = function(body, skin) {
    return new actorObject(body, skin);
  }

  var actorObject = function(body, skin) {
    this.body = body;
    this.skin = skin;
    var originalZoom = ngrCamera.getZoom();
    var originalObjectScale = this.skin.scaleX;
    var originalScale = ngrState.getScale() * ngrCamera.getZoom();
    var rotate = true;
    var scale = true;

    this.GetPosition = function() {
      return body.GetPosition();
    }

    this.noRotate = function() {
      rotate = false;
    }

    this.noScale = function() {
      scale = false;
    }
    
    this.update = function() { // translate box2d positions to pixels
      if (rotate) this.skin.rotation = this.body.GetAngle() * (180 / Math.PI);
      var scale = ngrState.getScale() * ngrCamera.getZoom();
      this.skin.x = this.body.GetWorldCenter().x * scale;
      this.skin.y = this.body.GetWorldCenter().y * scale;
      if (scale) this.skin.scaleX =  ngrCamera.getZoom() * originalObjectScale;
      if (scale) this.skin.scaleY =  ngrCamera.getZoom() * originalObjectScale;
    }
  }

})
