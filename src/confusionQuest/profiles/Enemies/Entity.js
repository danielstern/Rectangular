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
                this.tickFunctions = [];
                this.createdListeners = [];

                this.ontick = function(l){
                  this.tickFunctions.push(l);
                }

/*                this.oncreated = function(l) {

                	this.createdListeners.push(l);
                }*/

                this.state = {
                    facingLeft: true,
                    facingRight: false,
                    isJumping: false,
                    isAttacking: false,
                    hp: this.stats.health,
                }

                this.__tick = function(){
                   if (entity.tick) entity.tick(entity);
                   if (entity._tick) entity._tick(entity);
                }

                this.getState = function() {
                    return entity.state;
                };

                this.init();
                this.oncreated();
                ngrLoop.addHook(entity.__tick);

                /*
                ngrGame.control(entity, {
                    'a': 'goingLeft',
                    'd': 'goingRight',
                    'w': 'isJumping',
                    'p': 'isAttacking',
                })*/
            };

            Entity.prototype.hooks = [];

            return Entity;

        }

        return Entity;

    })