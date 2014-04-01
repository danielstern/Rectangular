angular.module("Rectangular")
  .service('ngrGame', function (ngrWorld, ngrStage, ngrInterface, heroGenerator, ngrCamera, ngrLoop, ngrDefaults, $q) {

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

    this.control = function (body, hero, map) {

      console.log("Controlling body...",body);

      var hero = new heroGenerator.getHero(body);
      var state = hero.getState();
      ngrLoop.addHook(hero.tick);

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

    this.turnToCannonball = function (thing, volatility) {
      thing.onimpact(g.explode);
    }

  })

.service('heroGenerator', function (ngrLoop) {
  function Hero(body,options) {
    var h = this;
    h.height = 1.2;
    h.width = 0.7;
    h.body = body;
    h.type = 'dynamic';
    h.friction = 0.1;
    h.density = 0.2;

    var state = {
      goingLeft: false,
      goingRight: false,
      isJumping: false,
      airBorne: false,
      jumpWait: 0,
      airborneGraceTime: 0,
      usedGroundSmash: false,
      dashInputTimeRight: 0,
      dashInputTimeLeft: 0,
      dashCurrentCooldown: 0,
      dashReadyRight: false,
      dashReadyLeft: false,
      idling: false,
    }

    var stats = {
      lateralSpeed: 60,
      lateralSpeedJumping: 45,
      jumpCooldown: 25,
      jumpForce: 1500,
      doubleJumpForce: 400,
      airborneGrace: 20,
      groundSmashPower: 3000,
      dashInputTimeout: 5,
      dashCooldown: 40,
      dashForce: 500,
      maxSpeed: 30,
      dashForceAir: 250,
      brakeSpeed: 0.5
    }

    this.getState = function () {
      return state;
    }

    this.brake = function () {
      var heroBody = h.body;

      var y = heroBody.GetLinearVelocity().x * heroBody.GetInertia();
      var n = heroBody.GetAngularVelocity() * heroBody.GetInertia();
      //console.log("Braking",y)
      heroBody.ApplyForce(new b2Vec2(-y * 10, 0), heroBody.GetWorldCenter());
      heroBody.ApplyTorque(-n * 10);
    }

    this.tick = function () {

      var heroBody = h.body;

      var currentSpeed = heroBody.GetLinearVelocity().x;
      var speedingL = currentSpeed < -stats.maxSpeed;
      var speedingR = currentSpeed > stats.maxSpeed;
      // console.log("Current speed?",currentSpeed);

      var contacts = h.body.GetContactList();
      if (contacts && contacts.contact.IsTouching()) {
        state.airborne = false;
        state.airborneGraceTime = stats.airborneGrace;
        state.usedGroundSmash = false;
      } else {
        if (!state.airborneGraceTime) state.airborne = true;
      }

      if (state.goingLeft && !speedingL) {
        var s = stats;
        var heroBody = h.body;
        if (state.dashReadyLeft) {
          // console.log("dashing.");
          var force = state.airborne ? s.dashForceAir : s.dashForce;
          heroBody.ApplyForce(new b2Vec2(-force, 0), heroBody.GetWorldCenter());
          state.dashReadyLeft = false;
          state.dashCurrentCooldown = stats.dashCooldown;
        }
        if (state.idling) state.dashInputTimeLeft = s.dashInputTimeout;
        var force = state.airborne ? s.lateralSpeedJumping : s.lateralSpeed;
        heroBody.ApplyForce(new b2Vec2(-force, 0), heroBody.GetWorldCenter());
      } else if (state.dashInputTimeLeft) {
        if (!state.dashCurrentCooldown) state.dashReadyLeft = true;
      } else

      if (state.goingRight && !speedingR) {
        var s = stats;
        var heroBody = h.body;
        if (state.dashReadyRight) {
          // console.log("dashing.");
          var force = state.airborne ? s.dashForceAir : s.dashForce;
          heroBody.ApplyForce(new b2Vec2(force, 0), heroBody.GetWorldCenter());
          state.dashReadyRight = false;
          state.dashCurrentCooldown = stats.dashCooldown;
        }
        if (state.idling) state.dashInputTimeRight = s.dashInputTimeout;
        var force = state.airborne ? s.lateralSpeedJumping : s.lateralSpeed;
        heroBody.ApplyForce(new b2Vec2(force, 0), heroBody.GetWorldCenter());
      } else if (state.dashInputTimeRight) {
        if (!state.dashCurrentCooldown) state.dashReadyRight = true;
      }

      if (!state.goingRight && !state.goingLeft) {
        state.idling = true;
        h.brake()
      } else {
        state.idling = false;
      }

      if (state.isJumping) {
        var s = stats;

        if (!state.jumpWait) {

          console.log("Jumping")
          state.jumpWait = stats.jumpCooldown;
          var force = state.airborne ? s.doubleJumpForce : s.jumpForce;
          heroBody.ApplyForce(new b2Vec2(0, -force), heroBody.GetWorldCenter());

        }
      }

      if (state.airborne && state.isCrouching) {
        if (!state.usedGroundSmash) {
          var force = stats.groundSmashPower;
          heroBody.ApplyForce(new b2Vec2(0, stats.groundSmashPower), heroBody.GetWorldCenter());
          state.usedGroundSmash = true;
        }

      }

      if (state.jumpWait) state.jumpWait--;
      if (state.airborneGraceTime) state.airborneGraceTime--;
      if (state.dashInputTimeRight) state.dashInputTimeRight--;
      if (state.dashInputTimeLeft) state.dashInputTimeLeft--;
      if (state.dashCurrentCooldown) state.dashCurrentCooldown--;

      h.body.SetAngle(0);
    }
  }

  this.getHero = function (body) {
    
    return new Hero(body);
  }
})
