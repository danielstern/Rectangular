/**
 * Overwrites default Mousetrap.bind method to optionally accept
 * an object to bind multiple key events in a single call
 *
 * You can pass it in like:
 *
 * Mousetrap.bind({
 *     'a': function() { console.log('a'); },
 *     'b': function() { console.log('b'); }
 * });
 *
 * And can optionally pass in 'keypress', 'keydown', or 'keyup'
 * as a second argument
 *
 */
/* global Mousetrap:true */

  Mousetrap = (function (Mousetrap) {
    var self = Mousetrap,
      _oldBind = self.bind,
      args;

    self.bind = function () {
      args = arguments;

      // normal call
      if (typeof args[0] == 'string' || args[0] instanceof Array) {
        return _oldBind(args[0], args[1], args[2]);
      }

      // object passed in
      for (var key in args[0]) {
        if (args[0].hasOwnProperty(key)) {
          _oldBind(key, args[0][key], args[1]);
        }
      }
    };

    return self;
  })(Mousetrap);

  window.s4 = function() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  window.guid = function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  if (Box2D) {
    
      window.b2Vec2 = Box2D.Common.Math.b2Vec2;
      window.b2AABB = Box2D.Collision.b2AABB;
      window.b2BodyDef = Box2D.Dynamics.b2BodyDef;
      window.b2Body = Box2D.Dynamics.b2Body;
      window.b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
      window.b2Fixture = Box2D.Dynamics.b2Fixture;
      window.b2World = Box2D.Dynamics.b2World;
      window.b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
      window.b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
      window.b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
      window.b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef;
      window.b2Shape = Box2D.Collision.Shapes.b2Shape;
      window.b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;
      window.b2Joint = Box2D.Dynamics.Joints.b2Joint;
      window.b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef;
  }

  console.logOnce = function(msg) {
    window.__loggedFunctions = window.__loggedFunctions || [];
    var caller = arguments.callee.caller.toString();
    for (var i = 0; i < __loggedFunctions.length; i++ ) {
      if (caller == __loggedFunctions[i]) return;
    }
    window.logOnce = arguments;

    for (var i = 0; i < arguments.length; i++) {
      console.log(arguments[i]);  
    }
    
    __loggedFunctions.push(caller);
  }

  window.epicId = function() {
    var a = "tarantino alphanumeric math bradley finn jake mordecai rigby optimus claptrap bayonetta".split(" ");
    var b = "hadoken ryu ken zangief blanka guile excalibur excalipar gilgamesh odin".split(" ");
    return _.sample(a) + "-" + _.sample(b);
  }

  _.mixin({
    call: function (arrayOfFunctions, arg) {
      _.each(arrayOfFunctions, function (func) {
        func(arg);
      })
    }
  })

 function Class(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
 
  // The base Class implementation (does nothing)
  this.Class = function(){};
 
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
   
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
           
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
           
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
           
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
   
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
   
    // Populate our constructed prototype object
    Class.prototype = prototype;
   
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;
 
    // And make this class extendable
    Class.extend = arguments.callee;
   
    return Class;
  };
  
 }