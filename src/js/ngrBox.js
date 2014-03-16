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

  this.options = options;

  this.isShape = true;


  this.getBodyDef = function() {
    var b = new b2BodyDef();

    b.position.Set(options.x, options.y);
    b.angle = options.angle;

    switch (options.position) {
      case 'dynamic':
      case b2Body.b2_dynamicBody:
        b.type = b2Body.b2_dynamicBody;
        break;
      case 'static':
      case b2Body.b2_staticBody:
      default:
        b.type = b2Body.b2_staticBody;
        break;
    }


    return b;

  }

  this.getFixtureDef = function() {
    var f = new b2FixtureDef;

    switch (options.type) {
      case 'box':
        f.shape = new b2PolygonShape();
        f.shape.SetAsBox(options.width, options.height);
        break;
      case 'circle':
        f.shape = new b2CircleShape();
        f.shape.SetRadius(options.radius);
        break;

      default:
        f.shape = new b2PolygonShape();
        f.shape.SetAsBox(options.width, options.height);
        break;
    }

    f.density = options.density;
    f.friction = options.friction;
    f.restitution = options.restitution;

    return f;
  }

}
