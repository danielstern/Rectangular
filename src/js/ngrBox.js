angular.module('Rectangular')
  .service("ngrBox", function(ngrState, ngrDefaults) {

    this.shape = function(options) {

      if (!_.isObject(options)) throw new Error("You must define options to create a shape.")

      var defaults = _.clone(ngrDefaults.body);

      options = _.extend(defaults, options);
      options = _.each(options, function(value, key) {
        if (!isNaN(Number(value))) options[key] = Number(value);
      })

      switch (options.shapeKind) {
        case 'box':
        case 'rectangle':
        case 'square':
          options.type = 'box';
          break;
        case 'circle':
        case 'ellipse':
          options.type = 'circle';
          break;
        case 'triangle':
          options.type = 'triangle';
          break;
        default:
          console.log("Can't do that");
          throw new Error();
          return;
      }


      var s = new NgShape(options);


      return s;
    }
  })

function NgShape(options) {

  if (options.isShape) {
    return options;
  }

  this.options = _.clone(options);
  this.isShape = true;


  this.getBodyDef = function() {

    var b = new b2BodyDef();

    b.position.Set(Number(this.options.x || 0), Number(this.options.y || 0));
    b.angle = Number(this.options.angle || 0);

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
        throw new Error ("You must define a body type in your options",this.options);
        break;
    }


    return b;

  }

  this.getFixtureDef = function() {
    var f = new b2FixtureDef;

    switch (options.shapeKind) {
      case 'box':
        f.shape = new b2PolygonShape();
        f.shape.SetAsBox(options.width, options.height);
        break;
      case 'circle':
        f.shape = new b2CircleShape();
        f.shape.SetRadius(Number(options.radius));
        break;
      default:
        throw new Error ("You must defind a shapeKind in your options.");
        break;
    }

    f.density = Number(options.density);
    f.friction = Number(options.friction);
    f.restitution = Number(options.restitution);

    return f;
  }

}
