angular.module("GameAgent", ['Rectangular', 'ngAudio'])
  .service('ngrGame', function(ngrWorld, ngrStage, ngrDisplay, ngrInterface, ngrCamera, ngrLoop, ngrDefaults, $q) {

    var w = ngrWorld;
    var g = this;
    var canvas = $('canvas')[0];
    var p = $(canvas).parent();
    var panning = false;
    var dragging = false;
    var profiles = [];
    var events = [];
    var createEntityListeners = [];

    this.bullet = {
      shapeKind: 'circle',
      radius: 0.15,
      density: 600,
      bullet: true,
      src: 'img/box-red.png',
      bg: 'tiled',
      hidden: false,
      userData: {
        igniter: true,
      },
      restitution: 0.99,
      friction: 0,
      gravityScale: 0,
      timedLife: true,
      lifeTime: 15,
      type: 'dynamic',
    }


    this.oncreateentity = function(f) {
      createEntityListeners.push(f);
    }

    this.getEvents = function() {
      _.each(events, function(event) {
        events[event] = true;
      })
      return events;
    }

    this.setEvent = function(event) {
      events.push(event);
    }

    this.effect = function(effect, point) {
      var effectDef = _.clone(ngrDefaults.body);
      //effectDef.radius = 0.3;
      effectDef.skin = effect.skin;
      effectDef.shapeKind = 'circle';
      effectDef.bg = 'spritesheet';
      effectDef.effect = true;
      effectDef.x = point.x;
      effectDef.y = point.y;
      effectDef.startAt = 'explode';
      effectDef = _.extend(effectDef, effect.skin);
      effectDef.userData = {
        isEffect: true,
      }

      var effect = ngrWorld.addElement(effectDef);
      //   effect.SetPosition(point);
      effect.SetType(0);
      effect.setSensor(true);
      ngrLoop.wait(300)
        .then(function() {
          effect.crumble();
        })

      ngrWorld.getWorld().onbegincontact(contactHandler);
      ngrWorld.getWorld().onpresolve(contactHandler);

      function contactHandler(contact, _oldManifold) {
        var body1 = contact.GetFixtureA().GetBody();
        var body2 = contact.GetFixtureB().GetBody();

        var data1 = body1.GetUserData() || {};
        var data2 = body2.GetUserData() || {};

        if (data1.isEffect || data2.isEffect) {
          contact.SetEnabled(false);
        }
      }

    }



    this.aoe = function(point, range, callback, duration) {

      var effectDef = _.clone(ngrDefaults.body);
      var hitBodies = [];

      effectDef.shapeKind = 'circle';
      effectDef.radius = range;
      effectDef.x = point.x;
      effectDef.y = point.y;
      effectDef.userData = {
        isEffect: true,
      }

      var effect = ngrWorld.addElement(effectDef);
      effect.SetType(0);

      ngrLoop.wait(duration || 5)
        .then(function() {
          effect.crumble();
        });

      effect.onimpact(function(j, p1, p2, manifold) {
        if (hitBodies.indexOf(j.id) > -1) return;
        hitBodies.push(j.id);
        callback(j, p1, p2);
      })

    }

    ngrWorld.oncreatebody(function(body) {

      if (body.options.profile) {

        var profile = profiles[body.options.profile];
        if (!profile) {
          console.error("No profile available,", body.options.profile)
          return;
        };
        var entity = new profile(body);
        //console.log("Got profile",entity);
        entity.type = body.options.profile;
        entity.constructor = profile;

        _.call(createEntityListeners, entity);
      }
    })

    this.score = function(points) {
      //console.log("You scored " + points + " points dog");
    }

    this.powerup = undefined;

    this.pause = ngrLoop.stop;
    this.unpause = ngrLoop.start;

    this.dragToPan = function(enable) {
      ngrInterface.onclick(function(r) {
        panning = r.body == undefined;
        panStartPoint = _.clone(r);
        ngrCamera.unfollow();
      })

      ngrInterface.onmouseup(function(r) {
        panning = false;
      })

      ngrInterface.onmove(function(r) {
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

    this.control = function(hero, map) {

      var state = hero.getState();

      _.each(map, function(value, key) {
        Mousetrap.bind(key, function() {
          state[value] = true;
        }, 'keydown');

        Mousetrap.bind(key, function() {
          state[value] = false;
        }, 'keyup');
      })
    };

    this.godMode = function(enable) {
      var cursorJoint = undefined;

      ngrInterface.onclick(function(r) {
        if (r.body) {
          cursorJoint = ngrWorld.addMouseJoint(r.body, r);
        }
      })

      ngrInterface.onmouseup(function(r) {
        if (cursorJoint) cursorJoint = ngrWorld.destroyJoint(cursorJoint);
      })

      ngrInterface.onmove(function(r) {
        if (cursorJoint) cursorJoint.SetTarget(new b2Vec2(r.worldPosX, r.worldPosY))

      })
    }

    this.explode = function(thing) {

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

    this.tag = function(body, img) {

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

    this.screen = function(options) {
      var r = $q.defer();
      var c = ngrDisplay.overlay(options.bg);
      ngrInterface.onescape(function() {
        endScreen();
      });

      if (options.duration) {
        setTimeout(endScreen, options.duration * 1000)
      }

      function endScreen() {
        c.close();
        r.resolve();
      }

      return r.promise;
    }

    var controlLoop;

    this.addProfile = function(name, def) {
      profiles[name] = def;
    }

    this.turnToCannonball = function(thing, volatility) {
      thing.onimpact(g.explode);
    }

  })
  .service('ngrSoundtrack', function() {

    var soundtrack = this;

    createjs.Sound.addEventListener("fileload", loadHandler);

    this.registerSounds = function(sounds) {
      console.log("registering sounds", sounds);
      _.each(sounds, function(sound) {
        var maxtimes = 1;
        if (sound.kind = 'effect') maxTimes = 10;
        createjs.Sound.registerSound(sound.src, sound.id, maxtimes);
      })
    }

    this.play = function(id) {
      createjs.Sound.play(id);
    }

    function loadHandler(e) {
      //   console.log("Loaded", e);
    }

  })
