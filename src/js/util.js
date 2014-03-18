
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
Mousetrap = (function(Mousetrap) {
  var self = Mousetrap,
    _oldBind = self.bind,
    args;

  self.bind = function() {
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


function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

if (Box2D) {
  var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2AABB = Box2D.Collision.b2AABB,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2Fixture = Box2D.Dynamics.b2Fixture,
    b2World = Box2D.Dynamics.b2World,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
    b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef,
    b2Shape = Box2D.Collision.Shapes.b2Shape,
    b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef,
    b2Joint = Box2D.Dynamics.Joints.b2Joint,
    b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef;
}

function epicId() {
   var a = "infusive paleobotany telecourse lauenburg braird interwreathed humpless dogcatcher debutante perilaus excluded polyvoltine chemosmotic coadventuring ephah buncombe reconcentrate".split(" ");
   var b = "brevetted jobyna ashkhabad trophozoite concentrate galopade mucking alcoholizing lud cystoid unreassuring monocarpous equestrienne shrimplike significative resystematizing freeing".split(" ");
   return _.sample(a) + "-" + _.sample(b);
}