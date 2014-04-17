angular.module('ConfusionQuest')
    .service('Enemy', function(ngrGame, ngrLoop, ngrWorld, Entity, ConfusionQuestSFX, ConfusionQuestDefaults) {

        function Enemy(stats) {
            return newEnemy(stats);
        }

        function newEnemy(stats) {

            var Enemy = Entity(stats);

            Enemy.prototype.die = function() {
                var pos = this.body.GetPosition();
                ngrGame.effect(ConfusionQuestSFX.explosion3Big, pos);
                this.body.crumble();
                this.state.dead = true;
            };

            Enemy.prototype.damage = function(dmg) {
                this.state.hp -= dmg;
            };

            Enemy.prototype.oncreated = function() {
                var enemy = this;
                console.log("Oncreated")
                this.body.SetType(2);
                this.stats.hp = this.stats.health;

                this.body.onimpact(function(other) {

                    if (other.GetUserData() && other.GetUserData().isHero) {
                        var hero = other.profile;
                        if (this.stats.dangerTouch) hero.damage(this.stats.attack, enemy);
                    }

                });

                if (this.tick) ngrLoop.addHook(this.tick);
                ngrLoop.addHook(this._tick, enemy);

                if (this.super) this.super(enemy);
            }

            Enemy.prototype._tick = function(enemy) {

                if (enemy.state.dead) return;
                if (enemy.body.sprite && enemy.body.sprite.animation) {
                    enemy.onhassprite();
                };

                if (enemy.state.hp <= 0) {
                    enemy.die();
                }

                if (enemy.state.isAttacking) {
                    console.log("enemy attack!");
                }
            }

            Enemy.prototype.onhassprite = function() {
                var anim = this.body.sprite.animation;

                _.each(anim.spriteSheet.getAnimations(), function(animation) {
                    anim.spriteSheet.getAnimation(animation).speed = 0.4;
                });
            }

            return Enemy;

        }

        return Enemy;
    })

