angular.module("Calvin")
.service("CalvinAnimations", function (ngrLoop) {
  var hero;
  var anim;

  this.animate = function (_hero) {
    hero = _hero;

    ngrLoop.addHook(tick);
  }

  function tick() {

    var state = hero.getState();
    anim = hero.body.sprite.animation;

    if (!anim) return;

    if (!state.isAttacking && !state.airborne && anim.currentAnimation == "jump" || !state.airborne && anim.currentAnimation == "fly") {
      anim.gotoAndPlay("stand");
    }

    if (state.facingRight) {
      anim.scaleX = Math.abs(anim.scaleX);
    };

    if (state.facingLeft) {
      anim.scaleX = -Math.abs(anim.scaleX);
    }

    if (!state.isAttacking && state.goingRight) {
      if (anim.currentAnimation != "run" && anim.currentAnimation != "jump" && !state.airborne) anim.gotoAndPlay("run");

    }

    if (!state.isAttacking && state.goingLeft) {
      if (anim.currentAnimation != "run" && anim.currentAnimation != "jump" && !state.airborne) anim.gotoAndPlay("run");

    }

    if (!state.isAttacking && state.airborne) {
      if (anim.currentAnimation != "jump" && anim.currentAnimation != "fly") anim.gotoAndPlay("fly");
    }

    if (!state.isAttacking && state.isJumping) {
      if (!state.invincible) {
        if (anim.currentAnimation != "jump") anim.gotoAndPlay("jump");
      }

    }

    if (state.isCrouching) {
      if (anim.currentAnimation != "duck" && !state.airborne) anim.gotoAndPlay("duck");
    }

    if (!state.goingLeft && !state.goingRight && !state.isAttacking && !state.isCrouching && !state.isJumping && !state.airborne) {
      if (anim.currentAnimation != "stand") anim.gotoAndPlay("stand");
    }

    if (state.isAttacking && state.currentAttack) {
      if (state.currentAttack.animation == "punch1") {
        if (anim.currentAnimation != "punch1") anim.gotoAndPlay("punch1");
      }

      if (state.currentAttack.animation == "punch2") {
        if (anim.currentAnimation != "punch2") anim.gotoAndPlay("punch2");
      }

      //console.log("")

      if (state.currentAttack.animation == "kick1") {
        if (anim.currentAnimation != "kick1") anim.gotoAndPlay("kick1");
      }

      if (state.currentAttack.animation == "kick2") {
        if (anim.currentAnimation != "kick2") anim.gotoAndPlay("kick2");
      }
    }

    if (state.invincible) {
      anim.gotoAndPlay("hurt");
    }

    _.each(anim.spriteSheet.getAnimations(), function (animation) {
      anim.spriteSheet.getAnimation(animation).speed = 0.4;
    });

  };

})
