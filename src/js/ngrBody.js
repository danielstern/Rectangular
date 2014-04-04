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

          if (vect > 0.0001) _.invoke(impactListeners, 'func', body, other, vect);

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
        f.SetSensor(bool);
        window.f = f;
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
