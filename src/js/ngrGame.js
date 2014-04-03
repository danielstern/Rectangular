angular.module("Rectangular")
  .service('ngrGame', function (ngrWorld, ngrStage, ngrInterface, ngrCamera, ngrLoop, ngrDefaults, $q) {

    var w = ngrWorld;
    var g = this;
    var canvas = $('canvas')[0];
    var p = $(canvas).parent();
    var panning = false;
    var dragging = false;

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

    // Lift and throw boxes like the puny pawns they are!
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

    if (!$('.blocker')[0]) {
      p.append('<div class="blocker"></div>');
      $('.blocker').append('<div class="blocker-inner"></div>');
    }

    var blockerRunning = false;
    var r;

    this.screen = function (src) {
      var c = ngrStage.overlay(src);
      ngrInterface.onescape(function () {
        ngrStage.removeChild(c);
      })
    }

    this.blocker = function () {

      if (blockerRunning) return r.promise;

      $('.blocker-inner').removeClass('block slide-out');

      r = $q.defer();
      $('.blocker-inner').addClass('block');
      blockerRunning = true;

      setTimeout(function () {
        r.resolve();

        blockerRunning = false;
        setTimeout(function () {
          $('.blocker-inner').addClass('slide-out');

          setTimeout(function () {
            $('.blocker-inner').removeClass('slide-out');
            $('.blocker-inner').removeClass('block');
          }, 250);

        }, 1000)

      }, 500);

      return r.promise;

    };

    var controlLoop;

    this.control = function (body, hero, map) {

      console.log("Controlling body...", body);

      var hero = new heroDefintions[hero](body);
      var state = hero.getState();
      if (controlLoop) ngrLoop.removeHook(controlLoop);
      controlLoop = ngrLoop.addHook(hero.tick);

      bindControls();

      function bindControls() {

        Mousetrap.bind({
          'd': function () {
            state.goingRight = true;
          },
          'a': function () {
            state.goingLeft = true;
          },
          'w': function () {
            state.isJumping = true;
          },
          's': function () {
            state.isCrouching = true;
          },
        }, 'keydown');

        Mousetrap.bind({
          'd': function () {
            state.goingRight = false;
          },
          'a': function () {
            state.goingLeft = false;
          },
          'w': function () {
            state.isJumping = false;
          },
          's': function () {
            state.isCrouching = false;
          },
        }, 'keyup');

      }
    }

    var heroDefintions = {};
    this.addHeroDefinition = function (name, def) {
      heroDefintions[name] = def;
    }

    this.turnToCannonball = function (thing, volatility) {
      thing.onimpact(g.explode);
    }

  })
