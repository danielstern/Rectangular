angular.module('ConfusionQuest')
  .service('doorRed', function(ngrGame, ConfusionQuestDefaults, ngrWorld) {

    var RedDoor = function(body) {

      //  body.setSensor(true);
      var door = this;
      ngrWorld.getWorld().onbegincontact(beginContactHandler);
      ngrWorld.getWorld().onpresolve(contactHandler);
      ngrWorld.getWorld().onendcontact(endContactHandler);
      ngrWorld.getWorld().onpostsolve(endContactHandler);

      function beginContactHandler(contact) {
        var body1 = contact.GetFixtureA().GetBody();
        var body2 = contact.GetFixtureB().GetBody();

        var data1 = body1.GetUserData() || {};
        var data2 = body2.GetUserData() || {};


        if (data1.isDoor && data2.isHero || data1.isHero && data2.isDoor) {
         
          if (data1.isHero) hero = body1.profile;
          if (data2.isHero) hero = body2.profile;
          hero.getState().isOnDoor = true;
          hero.getState().currentDoor = door;
        }

      }

      function contactHandler(contact, _oldManifold) {
        //console.log("prevsolve")
        var body1 = contact.GetFixtureA().GetBody();
        var body2 = contact.GetFixtureB().GetBody();

        var data1 = body1.GetUserData() || {};
        var data2 = body2.GetUserData() || {};


        if (data1.isDoor && data2.isHero || data1.isHero && data2.isDoor) {
          contact.SetEnabled(false);
        }
      }

      this.goInside = function() {
        console.log("You're entering this door");
      }

      function endContactHandler(contact, _oldManifold) {
        var body1 = contact.GetFixtureA().GetBody();
        var body2 = contact.GetFixtureB().GetBody();

        var data1 = body1.GetUserData() || {};
        var data2 = body2.GetUserData() || {};

        if (data1.isDoor && data2.isHero || data1.isHero && data2.isDoor) {
        console.log("POST")
          var hero;
          if (data1.isHero) hero = body1.profile;
          if (data2.isHero) hero = body2.profile;
          hero.getState().isOnDoor = false;
          console.log("Hero state?",hero.getState())
        }
      }

    }

    var defaults = {
      name: 'Door - Red',
      shape: 'box',
      skin: {
        src: 'img/sprites/doorRed.png',
        bg: 'spritesheet',
        frames: {
          width: 64,
          height: 79,
          regX: 32,
          regY: 38,
        },
        frameWidth: 64,
        frameHeight: 79,
        animations: {
          stand: {
            frames: [0]
          },
          closed: {
            frames: [0]
          },
          opening: {
            frames: [0, 1, 2, 3],
            next: 'open'
          },
          open: {
            frames: [3]
          }
        }
      },
      profile: "doorRed",
      userData: {
        isDoor: true,
      },
      index: 100,
      presets: {
        radius: 1,
        height: 4,
        width: 4,
        restitution: 0.2,
        density: 0.2
      }
    }

    ConfusionQuestDefaults.addDefault(defaults);
    ngrGame.addProfile('doorRed', RedDoor);

  })
