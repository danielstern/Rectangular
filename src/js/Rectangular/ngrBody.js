angular.module('Rectangular')
  .service("ngrBody", function (ngrLoop) {

    this.Body = function (_body) {
      var body = _body;
      var crumbleListeners = [];
      var impactListeners = [];
      var fallListeners = [];

      body.ngrBody = true;
      var bodyOriginalY = body.GetPosition().y;
      var bodyLoop = ngrLoop.addHook(function () {

        var options = body.options;

        if (options.timedLife) {

          options.lifeTime--;
          if (options.lifeTime < 0) body.crumble();
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
          var other = edge.other;

          var worldManifold = new Box2D.Collision.b2WorldManifold;
          contact.GetWorldManifold(worldManifold);
          var points = worldManifold.m_points;

          if (contact.IsTouching()) _.invoke(impactListeners, 'func', other,points[0],points[1],worldManifold);
          edge = edge.next;
        }


        if (body.GetPosition().y - bodyOriginalY > 2) {
          _.call(fallListeners);
        }

        if (body.GetPosition().y > 500) body.crumble();
      })

      body.oncrumble = function (func) {
        crumbleListeners.push(func);
      }

      body.onimpact = function (func) {
        impactListeners.push({
          func: func
        });
      }

      body.setSensor = function(bool) {
        var f = body.GetFixtureList();
        if (f) f.SetSensor(bool);
      }

      

      body.onfall = function (func) {
        fallListeners.push(func);
      }

      body.freeze = function () {

        if (body) body.SetType(0);

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
