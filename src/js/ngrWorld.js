angular.module('Rectangular')
/* Creates an instance of the world of the simulation, 
   and provides an interface for it. */
.service("ngrWorld", function (ngrBox, ngrModels, ngrState, ngrDefaults, ngrBody, ngrStage, ngrLoop) {

  var world,
    bodies = [],
    w = this,
    pins = [],
    followHook,
    hooks = [],
    memoryPairs = [];

  var worldLoop = undefined;

  this.getBodyById = function (_id) {
    return w.getBodiesByAttribute('id', _id)[0];
  }

  this.follow = function (body) {
    ngrState.setFocus(body.GetWorldCenter(), true)

    followHook = ngrLoop.addHook(function () {
      var pos = body.GetWorldCenter();
      ngrState.setFocus({
        x: pos.x,
        y: pos.y
      });
    });
  }

  this.explode = function (thing) {
    console.log("Exploding", thing);
    if (thing.crumbled) return;
    var posX = thing.GetPosition().x;
    var posY = thing.GetPosition().y;
    var pos = thing.GetPosition();
    var force = thing.options.explosiveness || 100000000;
    thing.crumble();

    var numRays = 10;
    while (numRays) {

      var angle = (i / numRays) * Math.PI * 2;
      var rayDir = new b2Vec2(Math.sin(angle) * force, Math.cos(angle) * force);

      var b = w.addElement(ngrDefaults.bullet);

      b.SetPosition(pos);

      b.ApplyForce(rayDir, b.GetWorldCenter());

      numRays--;
    }

  }

  this.unfollow = function (followHook) {
    ngrLoop.removeHook(followHook);
  }

  ngrLoop.addPermanentHook(function () {
    updateMemoryPairs();
    removeLostObjects();
    // expireObjects();
  });

  function updateMemoryPairs() {
    _.each(memoryPairs, function (pair) {
      var o = pair.element.options;
      var pos = pair.body.GetPosition();
      var angle = pair.body.GetAngle();
      var type = pair.body.GetType();
      o.x = pos.x;
      o.y = pos.y;
      o.angle = angle;
      o.type = type;
      o.userData = pair.body.GetUserData();

    });
  }

  function removeLostObjects() {
    _.each(bodies, function (body) {

      var pos = body.GetPosition();
      if (pos.y > 500) w.removeElement(body);

    });
  }

  this.getBodyByAttribute = function (key, val) {
    return w.getBodiesByAttribute(key, val)[0];
  }

  this.getBodiesByAttribute = function (key, val) {
    return _.filter(bodies, function (body) {
      if (body.options[key] == val) return true;
    }) || [];
  }

  this.getBodyByUserData = function (key, val) {
    return w.getBodiesByUserData(key, val)[0];
  }

  this.getBodiesByUserData = function (key, val) {
    return _.filter(bodies, function (body) {
      if (body.GetUserData() && body.GetUserData()[key] == val) return true;
    })
  }

  this.addElement = function (options) {

    var def = ngrBox.shape(options);
    var id = options.id || guid();

    var b = world.CreateBody(def.getBodyDef());
    var f = def.getFixtureDef()
    b.CreateFixture(f);

    b = new ngrBody.Body(b);
    //console.log("B?", b);

    b.oncrumble(function (body) {
      w.removeElement(body);
    })

    options.points = f.points;
    def.options.points = f.points;

    var type = b.GetType();

    /* bug fix for triangles */
    b.SetType(0);
    b.SetType(2);
    b.SetType(type);
    if (b.GetType() == '0' && options.center) b.GetLocalCenter().Set(options.center.x, options.center.y);
    options.center = b.GetLocalCenter();
    def.options.center = options.center;
    /* end bug fix */

    if (options.userData) b.SetUserData(options.userData);

    if (options.memo) {
      var prev = w.getBodyByAttribute('memo', options.memo);
      if (prev) w.removeElement(prev);
      if (prev) ngrStage.removeChild(prev.container);
    }

    b.id = id;

    var elementDef = {};
    elementDef.options = def.options;
    elementDef.id = id;
    ngrState.addElement(elementDef);

    memoryPairs.push({
      element: elementDef,
      body: b,
      id: id
    });

    b.options = _.clone(options);
    b.options.cycle = 0;

    bodies.push(b);

    if (!options.hidden) ngrStage.addSprite(b, options);

    return b;
  };

  this.pin = function (body, target) {

    if (!body) throw new Error("Can't pin nothing.");
    body.pins = body.pins || [];
    var m_world = world;
    var r = target;
    var mouse_joint = new b2MouseJointDef();
    mouse_joint.maxForce = 10000;

    var pinMemo = {};
    pinMemo.pinId = guid();
    pinMemo.target = target;
    pinMemo.bodyId = body.id;

    mouse_joint.pinId = pinMemo.pinId;

    ngrState.addPin(pinMemo);

    mouse_joint.bodyA = w.getWorld().GetGroundBody();
    mouse_joint.bodyB = body;
    mouse_joint.target.Set(r.worldPosX, r.worldPosY);
    mouse_joint.collideConnected = true;

    mouse_joint.maxForce = Number(body.mass) * 300;
    mouseJointBody = m_world.CreateJoint(mouse_joint);
    mouseJointBody.pinId = pinMemo.pinId;

    body.pins.push(mouseJointBody);
    pins.push(mouseJointBody);
    return mouseJointBody;
  }

  this.destroyJoint = function (joint) {
    ngrState.removePin(joint.pinId);

    if (joint) world.DestroyJoint(joint);

  }

  this.unpin = this.destroyJoint;

  this.removeElement = function (body) {

    var elId = body.id;
    world.DestroyBody(body);

    bodies = _.chain(bodies)
      .map(function (_body) {
        if (_body.id != elId) return _body;
      })
      .compact()
      .value();

    ngrState.removeElement(body);

    memoryPairs = _.map(memoryPairs, function (_pair) {
      if (_pair.id != elId) return _pair;
    })

    memoryPairs = _.compact(memoryPairs);

    ngrStage.removeChild(body.container);
  }

  this.clearAll = function () {
    _.each(bodies, function (body) {
      body.crumble();
    });

    _.each(pins, function (pin) {
      w.destroyJoint(pin);
    });

    bodies = [];
    pins = []
    ngrState.clearElements();
  }

  this.setGravity = function (grav) {
    world.SetGravity(new b2Vec2(0, grav))
  }

  this.setWorld = function (gravityX, gravityY, sleep) {

    var gravity = new b2Vec2(gravityX, gravityY);
    var doSleep = sleep;

    world = world || new b2World(gravity, false);

    worldLoop = ngrLoop.addPermanentHook(function () {

      world.Step(1 / 60, 10, 10)
      world.ClearForces();
      world.DrawDebugData();

    })

    ngrState.setWorld(world);

    return world;
  }

  this.getWorld = function () {
    return world;
  }
})
  .service("ngrBody", function (ngrLoop) {

    this.Body = function (_body) {
      var body = _body;
      var crumbleListeners = [];
      var impactListeners = [];

      body.ngrBody = true;
      var bodyLoop = ngrLoop.addHook(function () {

        var options = body.options;

        if (options.timedLife) {
          //  console.log("Objects timed life...",options.lifeTime);
          options.lifeTime--;
          if (!options.lifeTime) body.crumble();
        }

        if (options.movement) {

          options.cycle += Math.PI / 200 / options.movement.period || 1;
          var phase = options.movement.phaseShift || 0;
          var currentY = body.GetPosition().y;
          var currentX = body.GetPosition().x;
          var currentRotation = body.GetAngle();
          if (options.movement.shiftX || options.movement.shiftY) {
            var newY = currentY - (Math.sin(options.cycle + phase) / 50) * options.movement.shiftY;
            var newX = currentX - (Math.sin(options.cycle + phase) / 50) * options.movement.shiftX;
            body.SetPosition(new b2Vec2(newX, newY));
          }

          if (options.movement.rotation) {
            var newRotation = (phase) + (options.cycle / 50) * options.movement.rotation || 1;
            body.SetAngle(newRotation);
          }

        }

        var edge = body.GetContactList();
        while (edge) {

          var contact = edge.contact;
         // if (!contact.IsTouching()) break;
          var points = contact.m_oldManifold.m_points;
          var other = edge.other;

          var bodyMomentumX = body.GetLinearVelocity().x * body.GetInertia();
          var bodyMomentumY = body.GetLinearVelocity().y * body.GetInertia();
          var otherMomentumX = other.GetLinearVelocity().x * other.GetInertia();
          var otherMomentumY = other.GetLinearVelocity().y * other.GetInertia();

          var diffX = Math.abs(bodyMomentumX - otherMomentumX);
          var diffY = Math.abs(bodyMomentumY - otherMomentumY);
          var vect = Math.sqrt(diffX + diffY);

          var momentumDiff = {
            x: diffX,
            y: diffY,
            vect: vect
          }

          _.each(impactListeners,function(l){
             if (l.force < vect && vect < 1000) l.func(body);
          })

          edge = edge.next;
        }
      })

      body.oncrumble = function (func) {
        crumbleListeners.push(func);
      }

      body.onimpact = function (force, func) {
        impactListeners.push({
          force: force,
          func: func
        });
      }

      body.freeze = function () {
        var prev = {
          x: body.options.center.x,
          y: body.options.center.y
        }
        if (body) body.SetType(0);
        body.GetLocalCenter().Set(prev.x, prev.y);
      }

      body.unfreeze = function () {
        body.SetType(2);
      }

      body.crumble = function () {
        ngrLoop.removeHook(bodyLoop);
        body.crumbled = true;
        _.each(crumbleListeners, function (l) {
          l(body);
        })
      }

      return body;
    }

  })
