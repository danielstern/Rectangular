angular.module('ConfusionQuest')
  .service('Sara', function(ngrGame, ngrLoop, Enemy, ngrWorld, ConfusionQuestSFX, ConfusionQuestDefaults) {


    var stats = {
      id: "Sara",
      name: "Sara",
      health: 10000,
      damage: 15,
      invulnerable: true,
      speed: 0.2,
      muscle: 100,
      attacks: [{
        name: "Do Nothing",
        damage: 0,
        cooldown: 60,
        duration: 35,
        animation: "stand",
      }],
      name: "Sara",
    };

    var Sara = new Enemy(stats);
    Sara.prototype.init = function() {

      var enemy = this;

      enemy.behaviorListeners = [];

      enemy.onbehavior = function(l) {
        this.behaviorListeners.push(l);
      }

      ngrWorld.getWorld().onbegincontact(beginContactHandler);
      ngrWorld.getWorld().onendcontact(endContactHandler);

      function beginContactHandler(contact) {
        var body1 = contact.GetFixtureA().GetBody();
        var body2 = contact.GetFixtureB().GetBody();

        var data1 = body1.GetUserData() || {};
        var data2 = body2.GetUserData() || {};


        if (data1.isEnemy && data2.isHero || data1.isHero && data2.isEnemy) {

          var hero;
          var _npc;

          if (data1.isHero) {
            hero = body1.profile;
            _npc = body2.profile;
          } else {
            hero = body2.profile;
            _npc = body1.profile;
          }

          if (!_npc || _npc.body.id != enemy.body.id) return;  

          hero.getState().isOnNPC = true;
          hero.getState().currentNPC = enemy;
        }

      }


      function endContactHandler(contact, _oldManifold) {
        var body1 = contact.GetFixtureA().GetBody();
        var body2 = contact.GetFixtureB().GetBody();

        var data1 = body1.GetUserData() || {};
        var data2 = body2.GetUserData() || {};


        if (data1.isEnemy && data2.isHero || data1.isHero && data2.isEnemy) {

          var hero;
          var _npc;

          if (data1.isHero) {
            hero = body1.profile;
            _npc = body2.profile;
          } else {
            hero = body2.profile;
            _npc = body1.profile;
          }

          if (!_npc || _npc.body.id != enemy.body.id) return;  

          hero.getState().isOnNPC = false;
          hero.getState().currentNPC = null;
        }


      }

      this.interact = function() {
        var enemy = this;
        console.log("Hi");
        _.call(enemy.behaviorListeners,"speech-female");

      }

    }

    Sara.prototype.tick = function() {
      this.brake();
    }

    var defaults = {
      name: 'Sara',
      shape: 'box',
      profile: 'Sara',
      skin: {
        src: 'img/sprites/SaraFullSheet.png',
        bg: 'spritesheet',
        frames: {
          width: 64,
          height: 64,
          regX: 32,
          regY: 38,
        },
        frameWidth: 42,
        frameHeight: 42,
        animations: {
          stand: [13],
        }
      },
      presets: {
        height: 2.5,
        width: 2.5,
        restitution: 0.1,
        density: 0.07,
        friction: 0.2,
        gravityScale: 0.4
      }

    };

    _.extend(defaults, ConfusionQuestDefaults.enemy);
    ngrGame.addProfile('Sara', Sara);
    ConfusionQuestDefaults.addDefault(defaults);

  })
