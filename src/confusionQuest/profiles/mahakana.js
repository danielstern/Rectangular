angular.module('ConfusionQuest')
.service('enemy1', function (ngrGame, ngrLoop, ngrWorld) {

  var Enemy1 = function (body) {
    var stats = {
      id: "enemy1",
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

  ngrGame.addProfile('enemy1', Enemy1);

})

.service('Madness', function (ngrGame, ngrLoop, ngrWorld,ConfusionQuestDefaults) {

  var Madness = function (body) {
    var stats = {
      id: "enemy2",
      name: "madness",
      health: 20,
      damage: 15,
      speed: 0.2,
      attack: 15,
      img: 'img/unbalance.png',
      name: "Unbalance",
      description: "A shadowy and dangerous being.",
      flavor: "Not as friendly as you'd think.",
    }

    var madness = this;
    madness.body = body;

    body.onimpact(function (body, other) {

      if (other.GetUserData() && other.GetUserData().isHero) {
      console.log("Impact hero",other);
        var hero = other.profile;
        hero.damage(stats.attack, madness);

      }
    })

    ngrLoop.addHook(function () {

      _.each(body.sprite.animation.spriteSheet.getAnimations(), function (animation) {
         body.sprite.animation.spriteSheet.getAnimation(animation).speed = 0.4;
      });


    });
  };


  var defaults = {
    name: 'Madness',
    shape: 'box',
    profile: 'Madness',
    skin: {
      src: 'img/sprites/enemy1.png',
      bg: 'spritesheet',
      frames: {
        width: 395,
        height: 390,
        regX: 200,
        regY: 220,
      },
      frameWidth: 300,
      frameHeight: 300,
      animations: {
        stand: [0, 47],
      }
    },
    presets: {
      height: 2,
      width: 2,
      restitution: 0.1,
      density: 0.07,
      friction: 0.2,
      gravityScale: 0.4
    }

  };

  ngrGame.addProfile('Madness', Madness);
  ConfusionQuestDefaults.addDefault(defaults);

})
