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
            }

            Enemy.prototype._tick = function(enemy) {

              console.log("_tick,",enemy);

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

            Enemy.prototype.super = "Enemy";

            return Enemy;

        }

        return Enemy;
    })
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

                this.getState = function() {
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
