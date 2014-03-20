angular.module('Rectangular')
/* Creates an instance of the world of the simulation, 
   and provides an interface for it. */
.service("ngrWorld", function(ngrBox, ngrModels, ngrState, ngrLoop) {

  var world;
  var bodies = [];
  var w = this;
  var pins = [];
  var followHook;

  var hooks = [];
  var memoryPairs = [];

  this.load = function(json) {

    console.log(JSON.stringify(json));
    ngrState.setProperties(json.properties);

    _.each(json.elements, function(element) {
      element.options.id = element.id;
      w.addElement(element.options);
    })

    _.each(json.pins, function(pin) {
      var body = w.getBodyById(pin.bodyId);
      if (!body) console.error("Can't find the body for this pin.");
      if (body) w.pin(body, pin.target);
    })
  }

  this.getBodyById = function(_id) {
    return _.find(bodies, function(body) {
      if (body.id == _id) return body;
    })
  }



  this.follow = function(body) {
    ngrState.setFocus(body.GetWorldCenter(), true)

    followHook = ngrLoop.addHook(function() {
      var pos = body.GetWorldCenter();
      ngrState.setFocus({
        x: pos.x,
        y: pos.y
      });
    });
  }

  this.unfollow = function(followHook) {
    ngrLoop.removeHook(followHook);
  }

  ngrLoop.addPermanentHook(function() {
    _.each(memoryPairs, function(pair) {
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
  });

  ngrLoop.addPermanentHook(function() {
    _.each(bodies, function(body) {

      var pos = body.GetPosition();
      if (pos.y > 500) w.removeElement(body);

    });
  });

  this.getBodyByAttribute = function(key, val) {
    return _.find(bodies, function(body) {
      if (body.options[key] == val) return true;
    })
  }


  this.getBodyByUserData = function(key, val) {
    console.log("Bodies?",bodies);
    return _.find(bodies, function(body) {
      if (body.GetUserData() && body.GetUserData()[key] == val) return true;
    })
  }


  this.addElement = function(options) {

    var def = new NgShape(options);
    var id = options.id || guid();

    var b = world.CreateBody(def.getBodyDef());
    b.CreateFixture(def.getFixtureDef());
    if (options.userData) b.SetUserData(options.userData);

    if (options.memo) {
      var prev = w.getBodyByAttribute('memo', options.memo);
      if (prev) w.removeElement(prev);
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

    var privateOptions = _.clone(options);

    privateOptions.cycle = 0;
    b.options = privateOptions;

    bodies.push(b);

    return b;
  };

  this.pin = function(body, target) {

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

  this.destroyJoint = function(joint) {
    ngrState.removePin(joint.pinId);
    console.log("removing pin",joint);
    if (joint) world.DestroyJoint(joint);

  }

  this.unpin = this.destroyJoint;

  this.cycleBody = function(b) {

    var options = b.options;

    options.cycle += Math.PI / 200 / options.movement.period || 1;
    var phase = options.movement.phaseShift || 0;
    var currentY = b.GetPosition().y;
    var currentX = b.GetPosition().x;
    var currentRotation = b.GetAngle();
    if (options.movement.shiftX || options.movement.shiftY) {
      var newY = currentY - (Math.sin(options.cycle + phase) / 50) * options.movement.shiftY;
      var newX = currentX - (Math.sin(options.cycle + phase) / 50) * options.movement.shiftX;
      b.SetPosition(new b2Vec2(newX, newY));
    }

    if (options.movement.rotation) {
      var newRotation = (phase) + (options.cycle / 50) * options.movement.rotation || 1;
      b.SetAngle(newRotation);
    }

  }

  this.removeElement = function(body) {

    var elId = body.id;
    world.DestroyBody(body);

    //console.log("removing element",body);

    bodies = _.chain(bodies)
      .map(function(_body) {
        if (_body.id != elId) return _body;
      })
      .compact()
      .value();

    ngrState.removeElement(body);
    //ngrStage.removeChild(body);

    memoryPairs = _.map(memoryPairs, function(_pair) {
      if (_pair.id != elId) return _pair;
    })

    memoryPairs = _.compact(memoryPairs);
  }

  this.clearAll = function() {
    _.each(bodies, function(body) {
      w.removeElement(body);
    });

    _.each(pins, function(pin) {
      w.destroyJoint(pin);
    });

    bodies = [];
    pins = []
    ngrState.clearElements();
  }

  this.setGravity = function(grav) {
    world.SetGravity(new b2Vec2(0, grav))
  }

  var worldLoop = undefined;

  this.setWorld = function(gravityX, gravityY, sleep) {

    var gravity = new b2Vec2(gravityX, gravityY);
    var doSleep = sleep;

    world = world || new b2World(gravity, false);

    worldLoop = ngrLoop.addPermanentHook(function() {

      world.Step(1 / 60, 10, 10)
      world.ClearForces();
      world.DrawDebugData();

      _.each(bodies, function(body) {

        if (body.options && body.options.movement) {

          w.cycleBody(body);
        }

      })
    })

    return world;
  }

  this.getWorld = function() {
    return world;
  }
})
