angular.module('ConfusionQuest')
  .service('Enemy', function (ngrGame, ngrLoop, ngrWorld, Entity, ConfusionQuestSFX, ConfusionQuestDefaults) {

    function Enemy(stats) {
      return newEnemy(stats);
    }

    function newEnemy(stats) {

      var Enemy = Entity(stats);
      Enemy.prototype.die = function () {
        var pos = this.body.GetPosition();
        ngrGame.effect(ConfusionQuestSFX.explosion3Big, pos);
        this.body.crumble();
        this.state.dead = true;
      };

      Enemy.prototype.damage = function (dmg) {
        this.state.hp -= dmg;
      };


      
      return Enemy;

    }

    return Enemy;
  })
  .service("Entity", function (ngrGame, ngrLoop, ngrWorld, ConfusionQuestSFX, ConfusionQuestDefaults) {

    function Entity(stats) {
      return newEntity(stats);
    }

    function newEntity(stats) {

      var Entity = function (body) {

        this.stats = stats;

        var entity = this;
        entity.body = body;
        body.profile = this;

        this.state = {
          facingLeft: true,
          facingRight: false,
          isJumping: false,
          isAttacking: false,
          hp: this.stats.health,
        }

        this.getState = function () {
          return entity.state;
        };

        this.init();

        

        ngrGame.control(entity, {
          'a': 'goingLeft',
          'd': 'goingRight',
          'w': 'isJumping',
          'p': 'isAttacking',
        })
      };

      return Entity;

    }

    return Entity;

  })
