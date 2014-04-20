angular.module("ConfusionQuest")
  .service("Entity", function(ngrGame, ngrLoop, ngrWorld, ConfusionQuestSFX, ConfusionQuestDefaults) {

    function Entity(stats) {
      return newEntity(stats);
    }

    function newEntity(stats) {

      var Entity = function(body) {

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

        this.__tick = function() {
     //     console.log("Entity tick",entity.tick)
          if (entity.tick) entity.tick(entity);
          if (entity._tick) entity._tick(entity);
        }

        this.getState = function() {
          return entity.state;
        };

        if (this.init) this.init();
        if (this._init) this._init();
        if (this.oncreated) this.oncreated();
        ngrLoop.addHook(entity.__tick,entity);

      };

      Entity.prototype.hooks = [];

      Entity.prototype.brake = function() {

        if (this.state.dead) return;
        var body = this.body;

        var y = body.GetLinearVelocity().x * body.GetInertia();
        var n = body.GetAngularVelocity() * body.GetInertia();
        body.ApplyForce(new b2Vec2(-y * 10, 0), body.GetWorldCenter());
        body.ApplyTorque(-n * 10);
      };

      return Entity;

    }

    return Entity;

  })
