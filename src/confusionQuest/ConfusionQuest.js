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

    this.onstatechange = function (l) {
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

      if (powerup.points) {
        CQState.score += powerup.points;
        
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

        CQState.hero = hero;

        ngrCamera.follow(entity.body);
        ngrCamera.setZoom(1);
        var room = ngrState.getState().room;

        console.log("Adding listener to", hero);

        hero.onstatechange(function (heroState) {
          console.log("Hero state changed", heroState);
          _.call(stateChangeListeners, CQState);
          if (heroState.dead) {
            console.log("hero died...");
            ngrCamera.unfollow();
            ngrCamera.setZoom(0.5);
            ngrLoop.setSpeed(30);
          }
        });

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
