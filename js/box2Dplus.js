
var b2QuickStart = function(canvas) {
	canvas = canvas || document.getElementById('canvas');
	console.log("B2 Quickstart");
	var world = new b2World()
	console.log("Creating world", world);
	
	var definition = new b2Definition(b2HandyDandy.bodyProperties);
	definition.addFixture(b2HandyDandy.fixtureProperties);
	console.log("Creating serializable definition",definition);

	var bodyDef = definition.getBodyDef();
	var body = world.CreateBody(bodyDef);

	body.definition = definition;

	var fixDef = definition.getFixtureDefinitions()[0];
	//b2HandyDandy.fixtureProperties

	body.CreateFixture(fixDef);
	
	console.log("Creating test body,",body);
	world.Debug(canvas);
	console.log("Debugging");

	var t = world.timer.init(25);
	console.log("Initing timer...");

	console.log("Quick start succesful");
}

//quickstart properties

var b2HandyDandy = {
  bodyProperties: {
    x: 10,
    y: 1,
    type: 'dynamic',
    angle: 0,
  },
  fixtureProperties: {
    height: 0.5,
    width: 0.5,
    radius: 1.5,
    density: 0.5,
    shape: 'box',
    'friction': 0.2,
    'restitution': 0.1,
    'linearDamping': 0.0,
    'angularDamping': 0.0,
    gravityScale: 1.0,
  },
  world: {
    scale: 60,
    gravity: new b2Vec2(0, 60)
  }
}

// box2d World awesome
var b2World = function(gravity, draw, scale) {
	gravity = gravity || b2HandyDandy.world.gravity;
	scale = scale || 60;
  var world = new Box2D.Dynamics.b2World(gravity, draw);
  var b2Listener = Box2D.Dynamics.b2ContactListener;

  world.onCreateBodyListeners = [];
  world.beginContactListeners = [];
  world.presolveListeners = [];
  world.postsolveListeners = [];
  world.endContactListeners = [];

  /** 
   *
   *  b2WorldPlus keeps track of bodies itself.
   *
   *	**/
  world.bodies = [];

  /**
   *
   *		Contact Listener Shortcuts
   *
   */
  var listener = new b2Listener;

  listener.BeginContact = function(contact) {
    _.call(world.beginContactListeners, contact);
  }

  listener.EndContact = function(contact) {
    _.call(world.endContactListeners, contact);
  }

  listener.PostSolve = function(contact, impulse) {
    _.call(world.postsolveListeners, contact);
  }

  listener.PreSolve = function(contact, oldManifold) {
    _.call(world.presolveListeners, contact, oldManifold);
  }

  world.OnBeginContact = function(l) {
    world.beginContactListeners.push(l);
  }

  world.OnCreateBody = function(l) {
    onCreateBodyListeners.push(l);
  }

  world.OnPresolve = function(l) {
    world.presolveListeners.push(l);
  }

  world.OnEndContact = function(l) {
    world.endContactListeners.push(l)
  }

  world.OnPostsolve = function(l) {
    world.postsolveListeners.push(l)
  }

  world.SetContactListener(listener);


  /**
   *
   *		Body accessing shortcuts.
   *
   **/

  world.GetBodyByUserData = function(key, val) {
    return this.getBodiesByUserData(key, val)[0];
  }

  world.GetBodiesByUserData = function(key, val) {
    var bodies = this.getAllBodies();
    return _.filter(bodies, function(body) {
      if (body.GetUserData() && body.GetUserData()[key] == val) return true;
    })
  }


  world.GetAllBodies = function() {
    return this.bodies;
  }

  /**
   *
   *		Shortcut for debugging.
   *
   */
 

  world.Debug = function(canvas) {
    var p = $(canvas).parent();
    _canvas = canvas;

    var debugCanvas = canvas;

    ctx = debugCanvas.getContext('2d');
    ctxCurrentTranslation = {
      x: 0,
      y: 0
    }

    debugDraw = new b2DebugDraw();

    var scale = scale || b2HandyDandy.world.scale;
    debugDraw.SetSprite(ctx);
    debugDraw.SetDrawScale(scale);
    debugDraw.SetFillAlpha(0.5);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);
  }

  world.tick = function() {

    world.Step(1 / 60, 10, 10)
    world.ClearForces();
    world.DrawDebugData();

  }


  world.timer = new Timer();
  world.timer.addHook(world.tick);

  world._CreateBody = world.CreateBody;

  world.CreateBody = function(b2BodyDef) {
    var body = this._CreateBody(b2BodyDef);
    body.id = guid();
    this.bodies.push(body);
    return body;
  }

  world.clearAll = function() {
    _.each(bodies, function(body) {
      body.crumble();
    });

    bodies = [];
  }

  world._DestroyBody = world.DestroyBody;

  world.DestroyBody = function(b2Body) {
    var id = body.id;
    this._DestroyBody(body);
    _.without(array, body);
  }


  function guid() {
    var s4 = function() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }


  function Timer(freq) {
  	  var l = this;
  	  var speed = 60;
  	  var loop;
  	  var world;
  	  var hooks = [];
  	  var permanentHooks = [];

  	  this.tick = function () {

  	    _.each(hooks, function (hook) {
  	      hook.func(hook.arg);
  	    })

  	    _.each(permanentHooks, function (hook) {
  	      hook();
  	    })
  	  }

  	  this.addHook = function (func, arg) {
  	    var id = guid();

  	    var hook = {
  	      func: func,
  	      id: id,
  	      arg:arg,
  	    }

  	    hooks.push(hook);
  	    return hook;
  	  };

  	  this.wait = function (duration) {
  	    var r = $q.defer();

  	    duration = duration || 1;

  	    var h = l.addHook(function () {
  	      duration--;
  	      if (duration < 1) {
  	        l.removeHook(h);
  	        r.resolve();

  	      }
  	    })

  	    return r.promise;
  	  }

  	  this.removeHook = function (_hook) {
  	    hooks = _.without(hooks, _hook);
  	  }

  	  /**
  	  *
  	  * Add a hook not removed by removeHooks (call removeHook with the hook's hadnle to remove it)
  	  * @func - a function you want to be executed every world tick
  	  *
  	  */
  	  this.addPermanentHook = function (func) {
  	    permanentHooks.push(func);
  	  };

  	  this.clearHooks = function () {
  	    hooks = [];
  	  }

  	  this.stop = function () {
  	    clearInterval(loop);
  	  }

  	  this.setSpeed = function (_speed) {
  	    speed = _speed;
  	    if (loop) l.initWorld();
  	  }

  	  this.init = function (_speed) {
  	    speed = _speed || speed;
  	    clearInterval(loop);
  	    loop = setInterval(l.tick, 1000 / speed);
  	  };

  	  this.init;
  	  this.start = this.init;
  	}

  return world;
};

/**
 *
 *		Serializable box2D definition hybrid
 *		Pass a single Object to receive a serializable body def
 *
 **/
var b2Definition = function(options) {

	if (!options) {
		console.warn("You did not pass any options. Going with default options");
		options = b2HandyDandy.bodyProperties;
	}

  if (options.isShape) {
    return options;
  }

  var definition = this;

  this.options = options;
  this.fixtures = [];
  this.isShape = true;
  this.fixtureOptions = [];
 // this.fixtureOptions.push(options);

  this.getBodyDef = function() {

    var b = new b2BodyDef();

    b.position.Set(Number(this.options.x || 0), Number(this.options.y || 0));
    b.angle = Number(this.options.angle || 0);

    if (options.bullet) {
      b.linearDamping = 1;
    }

    b.gravityScale = options.gravityScale;

    switch (this.options.type) {
      case 'dynamic':
      case b2Body.b2_dynamicBody:
        b.type = b2Body.b2_dynamicBody;
        break;
      case 'static':
      case b2Body.b2_staticBody:
        b.type = b2Body.b2_staticBody;
        break;
      default:
        throw new Error("You must define a body type in your options", this.options);
        break;
    }

    return b;

  }

  this.addFixture = function(fixtureOptions) {
    definition.fixtureOptions.push(fixtureOptions);
  };

  this.getFixtureDefinitions = function() {
    var defs = [];
    _.each(definition.fixtureOptions, function(def) {

      var f = new b2FixtureDef;
      var options = def;

      if (options.effect) {

        options.radius = 0;
      }

      switch (options.shape) {
        case 'box':
          f.shape = new b2PolygonShape();
          f.shape.SetAsBox(Number(options.width), Number(options.height));
          break;
        case 'circle':
          f.shape = new b2CircleShape();
          f.shape.SetRadius(Number(options.radius));
          break;
        case 'triangle':
          console.warn("Triangles are not supported.");
          break;
        default:
          throw new Error("You must defind a shape in your options.",options);
          break;
      }



      f.density = Number(options.density || 0);
      f.friction = Number(options.friction || 0);
      f.restitution = Number(options.restitution || 0);

      if (options.bullet) {
        f.filter.groupIndex = -1;
      }

      if (options.collisionGroup) {
        f.filter.groupIndex = options.collisionGroup;
      }

      defs.push(f);

    })

    return defs;
  }
}


/**
 *
 *		Each
 *
 **/
var _ = _ || {};
_.each = _.each || function(arr, func) {
  for (var i = 0; i < arr.length; i++) {
    func(arr[i]);
  }
}

/**
 *
 *  Filter
 *
 **/
var _ = _ || {};
_.filter = _.filter || function(arr, filt) {
  var r = [];
  for (var i = 0; i < arr.length; i++) {
    if (filt(arr[i])) r.push(arr[i])
  }
  return r;
}

var _ = _ || {};
_.without = function(arr, el) {

  for (var i = 0; i < arr.length; i++) {
    if (el.id) {
      if (el.id == arr[0].id) arr.splice(i, 1);
    }
    if (el == arr[0]) arr.splice(i, 1);
  }

  return arr;
}

setTimeout(function(){

b2QuickStart();
})