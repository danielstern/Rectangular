angular.module("Rectangular")
  .service('ngrGame', function (ngrWorld, ngrStage, ngrInterface, ngrCamera, ngrLoop, ngrDefaults, $q) {

    var w = ngrWorld;
    var g = this;
    var canvas = $('canvas')[0];
    var p = $(canvas).parent();
    var panning = false;
    var dragging = false;
    var profiles = [];
    var createEntityListeners = [];

    this.oncreateentity = function(f) {
      createEntityListeners.push(f);
    }

    ngrWorld.oncreatebody(function(body){
      
      if (body.options.profile) {
      
        var profile = profiles[body.options.profile];
        if (!profile) {
            console.error("No profile available,",body.options.profile)
            return;
        };
        var entity = new profile(body);
        entity.type = body.options.profile;
        entity.constructor = profile;

        _.call(createEntityListeners,entity);
      }
    })

    this.score = function(points) {
      console.log("You scored " + points + " points dog");
    }

    this.powerup = undefined;

    this.dragToPan = function (enable) {
      ngrInterface.onclick(function (r) {
        panning = r.body == undefined;
        panStartPoint = _.clone(r);
        ngrCamera.unfollow();
      })

      ngrInterface.onmouseup(function (r) {
        panning = false;
      })

      ngrInterface.onmove(function (r) {
        if (panning) {
          var focus = ngrCamera.getFocus();
          var dif = {
            x: panStartPoint.worldPosX - r.worldPosX,
            y: panStartPoint.worldPosY - r.worldPosY,
          }

          ngrCamera.setFocus({
            x: focus.x + dif.x,
            y: focus.y + dif.y,
          }, false)
        }
      })
    }

    this.control = function (hero, map) {

      var state = hero.getState();
      if (controlLoop) ngrLoop.removeHook(controlLoop);
      controlLoop = ngrLoop.addHook(hero.tick);

      _.each(map,function(value,key){
        Mousetrap.bind(key, function(){
          state[value] = true;
        }, 'keydown');

        Mousetrap.bind(key, function(){
          state[value] = false;
        }, 'keyup');
      })
    };

    this.godMode = function (enable) {
      var cursorJoint = undefined;

      ngrInterface.onclick(function (r) {
        if (r.body) {
          cursorJoint = ngrWorld.addMouseJoint(r.body, r);
        }
      })

      ngrInterface.onmouseup(function (r) {
        if (cursorJoint) cursorJoint = ngrWorld.destroyJoint(cursorJoint);
      })

      ngrInterface.onmove(function (r) {
        if (cursorJoint) cursorJoint.SetTarget(new b2Vec2(r.worldPosX, r.worldPosY))

      })
    }

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

    this.tag = function (body, img) {

      var tagOptions = _.clone(body.options);

      tagOptions.src = img;
      tagOptions.bg = 'static';
      tagOptions.noScale = true;
      tagOptions.shapeKind = 'box';
      var c = ngrStage.addSprite(body, tagOptions);
      c.actor.noRotate();
      c.actor.noScale();
      c.container.regY = 2 * ngrCamera.getZoom() * ngrState.getScale();

    }

    this.screen = function (src) {
      var c = ngrStage.overlay(src);
      ngrInterface.onescape(function () {
        ngrStage.removeChild(c);
      })
    }


    var controlLoop;

    this.addProfile = function(name,def) {
      profiles[name] = def;
    }


    this.turnToCannonball = function (thing, volatility) {
      thing.onimpact(g.explode);
    }

  })
