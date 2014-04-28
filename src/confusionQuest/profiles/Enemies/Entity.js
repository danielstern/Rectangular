angular.module("ConfusionQuest")
  .service("Entity", function(ngrGame, ngrLoop, ngrWorld, ConfusionQuestSFX, ConfusionQuestDefaults) {

    var Entity = Backbone.Model.extend({
      defaults: {
        name: "Entity",
        state: {
          facingLeft: true,
          facingRight: false,
          isJumping: false,
          isAttacking: false,
          hp: 1
        }
      },
      tick: function() {

      },
      getState: function() {
        return this.state;
      },
      init: function(context) {
        ngrLoop.addHook(this.tick)
      },
      brake: function() {

        if (this.state.dead) return;
        var body = this.body;

        var y = body.GetLinearVelocity().x * body.GetInertia();
        var n = body.GetAngularVelocity() * body.GetInertia();
        body.ApplyForce(new b2Vec2(-y * 10, 0), body.GetWorldCenter());
        body.ApplyTorque(-n * 10);
      }
    })

    return Entity;

  })
