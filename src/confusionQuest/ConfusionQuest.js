angular.module('ConfusionQuest', [])
  .service("ConfusionQuest", function (ngrGame, ngrCamera, ngrState, ngrInterface, ngrStage,
    ConfusionQuestDefaults, questHero, confCoin, ruby,
    boots1, helmet1, enemy1) {

    var CQState = {
      lives: 0,
      powerups: [],
      score: 0,
    };

    var hero = undefined;
    var stateChangeListeners = [];

    this.onstagechange = function(l) {
      stateChangeListeners.push(l);
    }

    ngrGame.init = function () {
      CQState = {
        lives: 3,
        powerups: [],
        score: 0,
      }
    }

    ngrGame.powerup = function (powerup) {
      console.log("POWER UP!!", powerup, CQState.powerups);
      if (_.find(CQState.powerups, function (_powerup) {
        if (_powerup.id == powerup.id) return true;
      })) {} else {
        ngrGame.pause();
        var modal = ngrStage.modal({
          title: powerup.name,
          img: powerup.img,
          text: powerup.description,
          flavor: powerup.flavor
        });

        modal.find('.button').on('click', endModal);
        var esc = ngrInterface.onescape(endModal);

        function endModal() {
          modal.removeClass('rollIn');
          modal.addClass('rollOut');
          ngrGame.unpause();
        }
      }

      if (powerup.hero) {
        _.each(powerup.hero, function (boost, stat) {
          hero.changeStat(stat, boost);
        })
      }

      if (powerup.score) {
        CQState.score+= score;
        console.log("Score change!", CQState.score);
      }

      _.call(stateChangeListeners, CQState);
      CQState.powerups.push(powerup);

    }

    ngrGame.oncreateentity(function (entity) {

      if (entity.type == "questHero") {
        ngrGame.control(entity, {
          'a': 'goingLeft',
          'd': 'goingRight',
          'w': 'isJumping',
          's': 'isCrouching',
        });

        hero = entity;

        ngrCamera.follow(entity.body);
        ngrCamera.setZoom(1);
        var room = ngrState.getState().room;
        //  console.log("Room?",room);
        /*  ngrCamera.constrainFocus({
         x: 0,
         y: 0,
         width: room.width,
         height: room.height
       });*/
      }
    })

  })
