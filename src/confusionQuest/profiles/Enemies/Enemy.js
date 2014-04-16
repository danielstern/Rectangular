angular.module('ConfusionQuest')
  .service('Enemy', function (ngrGame, ngrLoop, ngrWorld, Entity, ConfusionQuestSFX, ConfusionQuestDefaults) {

    function Enemy(stats) {
      return newEnemy(stats);
    }

    function newEnemy(stats) {

      var Enemy = Entity(stats);



      return Enemy;

    }

    return Enemy;
  })
.service("Entity",function(ngrGame, ngrLoop, ngrWorld, ConfusionQuestSFX, ConfusionQuestDefaults){

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

      this.die =  function () {
        var pos = this.body.GetPosition();
        ngrGame.effect(ConfusionQuestSFX.explosion3Big, pos);
        this.body.crumble();
        this.state.dead = true;
      };

      this.damage = function (dmg) {
        this.state.hp -= dmg;
      }
      
      this.init =  function () {

        this.state.hp = entity.stats.health;

        entity.body.onimpact(function (other) {

          if (other.GetUserData() && other.GetUserData().isHero) {
            var hero = other.profile;
            hero.damage(entity.stats.attack, entity);
          }
        });

        this.body.SetType(2);

        ngrLoop.addHook(function () {

          if (entity.state.dead) return;
          if (entity.body.sprite && entity.body.sprite.animation) {
            var anim = entity.body.sprite.animation;

            _.each(anim.spriteSheet.getAnimations(), function (animation) {
              anim.spriteSheet.getAnimation(animation).speed = 0.4;
            });
          };

          if (entity.state.hp <= 0) {

            entity.die();
          }

        })



      }
        this.init();

      entity.tick = function () {
        if (entity.state.isAttacking) {
          console.log("entity attack!");
        }

      }

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