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
        },
        stateChangeListeners: [],
        behaviorListeners: []

      },
      tick: function() {

      },
      getState: function() {
        return this.state;
      },
      init: function(context) {
        console.log("Entity initing,",this);
        ngrLoop.addHook(this.tick);
        this.behaviorListeners = [];
        this.stateChangeListeners = [];
      },
      brake: function() {

        if (this.state.dead) return;
        var body = this.body;

        var y = body.GetLinearVelocity().x * body.GetInertia();
        var n = body.GetAngularVelocity() * body.GetInertia();
        body.ApplyForce(new b2Vec2(-y * 10, 0), body.GetWorldCenter());
        body.ApplyTorque(-n * 10);
      },
      onstatechange: function(l) {
        this.stateChangeListeners.push(l);
      },

      onbehavior: function(l) {
        this.behaviorListeners.push(l);
      }
    })

    return Entity;

  })
