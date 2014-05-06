// box2d World awesome

var b2World = function(gravity, draw) {
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

  world.onbegincontact = function(l) {
    world.beginContactListeners.push(l);
  }

  world.oncreatebody = function(l) {
    onCreateBodyListeners.push(l);
  }

  world.onpresolve = function(l) {
    world.presolveListeners.push(l);
  }

  world.onendcontact = function(l) {
    world.endContactListeners.push(l)
  }

  world.onpostsolve = function(l) {
    world.postsolveListeners.push(l)
  }

  world.SetContactListener(listener);


  /**
  *
  *		Body accessing shortcuts.
  *
  **/

  world.getBodyByUserData = function(key, val) {
    return this.getBodiesByUserData(key, val)[0];
  }

  world.getBodiesByUserData = function(key, val) {
    var bodies = this.getAllBodies();
    return _.filter(bodies, function(body) {
      if (body.GetUserData() && body.GetUserData()[key] == val) return true;
    })


  }

  world.getAllBodies = function() {
    return this.bodies;
  }

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
    _.remove(array, body);
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

  return world;
};

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
_.remove = function(arr, el) {

    for (var i = 0; i < arr.length; i++) {
      if (el.id) {
        if (el.id == arr[0].id) arr.splice(i, 1);
      }
      if (el == arr[0]) arr.splice(i, 1);
    }

    return arr;
  }
