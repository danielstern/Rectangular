angular.module('Mahakana',['Rectangular'])
.service('Mahakana', function (ngrGame, ngrLoop, ngrWorld, ConfusionQuestDefaults) {

  var Mahakana = function (body) {
    var stats = {
      id: "Mahakana",
      health: 20,
      damage: 15,
      speed: 0.2,
      minFloatHeight: 5,
      maxFloatHeight: 12,
      maxVelocityY: 4,
      floatPower: 50,
      attack: 15,
      antiGravity: 0.8,
      img: 'img/mahakana.png',
      name: "Mahakana",
      description: "The lowliest servants of the Emperor. Their tenetacles carry a powerful electrical charge.",
      flavor: "Tentacles, why did it have to be tentacles?",
    }

    var mahakana = this;
    var hitTop = false;

    this.body = body;

    body.onimpact(function (body, other) {

      //console.log("Other...",other);

      if (other.GetUserData() && other.GetUserData().isHero) {
        console.log("Mahakana impacts hero...", other);
        var hero = other.profile;
        hero.damage(stats.attack, mahakana);

      }
    })

    ngrLoop.addHook(function () {

      var inRange = false;

      var p1 = new b2Vec2(body.GetPosition().x, body.GetPosition().y);
      var p2 = new b2Vec2(body.GetPosition().x, body.GetPosition().y + stats.minFloatHeight); //center of scene
      var p3 = new b2Vec2(body.GetPosition().x, body.GetPosition().y + stats.minFloatHeight + stats.maxFloatHeight); //center of scene
      ngrWorld.getWorld().RayCast(function (x) {

        var otherData = x.m_body.GetUserData();
        if (otherData && otherData.isFloor) {

          stats.antiGravity = 1.1;
          inRange = true;
        }

      }, p1, p2);

      ngrWorld.getWorld().RayCast(function (x) {
        inRange = true;
      }, p2, p3);

      if (!inRange) {

        stats.antiGravity = 0.9;

      }

      
      mahakana.balanceX();
      mahakana.float();
      mahakana.throttleSpeed();

      body.SetAngle(0);

    });

    this.throttleSpeed = function() {
      var currentSpeedY = body.GetLinearVelocity().y;
      var currentSpeedX = body.GetLinearVelocity().x;
    //  console.log("Current speed Y?",currentSpeedY)
      if (currentSpeedY > stats.maxVelocityY) {
        body.SetLinearVelocity(new b2Vec2(currentSpeedX, stats.maxVelocityY));
      } else if (currentSpeedY < -stats.maxVelocityY) {
        body.SetLinearVelocity(new b2Vec2(currentSpeedX, -stats.maxVelocityY));
      }
    }
    this.balanceY = function () {
        var currentSpeedY = body.GetLinearVelocity().y;
        body.ApplyForce(new b2Vec2(0, -currentSpeedY * body.GetMass() * body.GetInertia()), body.GetWorldCenter());
    }

    this.balanceX = function () {
         var currentSpeedX = body.GetLinearVelocity().x;
          body.ApplyForce(new b2Vec2(-currentSpeedX * body.GetMass() * body.GetInertia()), body.GetWorldCenter(), 0);
    }

    this.float = function () {

      //body.ApplyForce(new b2Vec2(0, -ngrWorld.getWorld().GetGravity().y * body.GetMass()), body.GetWorldCenter());
      var antiGravity = ngrWorld.getWorld().GetGravity().y * stats.antiGravity;
      body.ApplyForce(new b2Vec2(0, -antiGravity * body.GetMass()), body.GetWorldCenter());;

    }
  }

  var defaults =  {
      name: 'Mahakana',
      shape: 'box',
      profile: 'Mahakana',
      skin: {
        src: 'img/sprites/mahakana.png',
        bg: 'spritesheet',
        frames: {
          width: 78,
          height: 110,
          regX: 44,
          regY: 50,
        },
        frameWidth: 70,
        frameHeight: 100,
        animations: {
          stand: {
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
            speed: 0.4
          },
        }
      },
      userData: {
        doodad: true,
      },
      presets: {
        height: 3,
        width: 1.5,
        restitution: 0.1,
        density: 0.07,
        friction: 0.2,
        gravityScale: 0.4
      }

    };

  ngrGame.addProfile('Mahakana', Mahakana);
    ConfusionQuestDefaults.addDefault(defaults);

})
