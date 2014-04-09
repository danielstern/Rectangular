angular.module('ConfusionQuest', ['Rectangular']);

define([
  'cq/ConfusionQuestDefaults',
  'cq/ConfusionQuestHud',
  'cq/ConfusionQuestLevels',

  'cq/profiles/boots1',
  'cq/profiles/helmet1',
  'cq/profiles/confCoin',
  'cq/profiles/ruby',
  'cq/profiles/keyRed',
  'cq/profiles/doorRed',
  'cq/profiles/mahakana',
  'cq/profiles/questhero',

  'cq/levels/devLevel'

], function () {
  angular.module('ConfusionQuest')
    .service("ConfusionQuest", function (ngrGame, ngrEnvironment, ngrLoop, ngrCamera, ngrData, ngrState, ngrWorld, ngrInterface, ngrStage,
      ConfusionQuestDefaults, ConfusionQuestLevels,
      questHero, confCoin, ruby, keyRed, doorRed,
      devLevel,
      boots1, helmet1, enemy1) {

      var CQState = {
        lives: 0,
        powerups: [],
        score: 0,
      };

      var hero = undefined;
      var stateChangeListeners = [];
      var messageListeners = [];

      this.onstatechange = function (l) {
        stateChangeListeners.push(l);
      }

      this.onmessage = function (l) {
        messageListeners.push(l);
      }

      ngrGame.init = function () {
        CQState = {
          lives: 3,
          powerups: [],
          score: 0,
        }

        console.log("Initing game!");
        ngrEnvironment.clearAll();

        ngrData.load(ConfusionQuestLevels.levels[0]);

        ngrGame.screen("img/Confusion-Quest-Title-NoText.png");

        ngrCamera.setZoom(1);
        ngrLoop.setSpeed(60);
        //ngrLoop.unpause();

        var room = ngrState.getState().room;
        ngrCamera.constrainFocus({
          x: 0,
          y: 0,
          width: room.width,
          height: room.height
        });

        _.call(stateChangeListeners, CQState);
        _.call(messageListeners, "Press enter");
      }

      ngrGame.endGame = function () {
        ngrGame.screen("img/Confusion-Quest-Title-NoText.png");
        _.call(messageListeners, "Demo Over");
        setTimeout(ngrGame.init, 2000);
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

        if (powerup.event) {

          ngrGame.setEvent(powerup.event);
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

          console.log("Adding listener to", hero);

          hero.onstatechange(function (heroState) {
            _.call(stateChangeListeners, CQState);
            if (heroState.dead) {
              ngrCamera.unfollow();
              ngrCamera.setZoom(0.5);
              ngrLoop.setSpeed(30);

              ngrLoop.wait(30)
                .then(function () {
                  ngrGame.init();
                })
            }
          });

          //  console.log("Room?",room);

        }
      })

    })

angular.module("ConfusionQuestDemo",['ConfusionQuest','Rectangular'])
.controller("ConfusionQuest",function($scope,ConfusionQuest, 
  ngrGame, ConfusionQuestHud, ngrEnvironment, ngrInterface, ngrStage, ngrCamera){

  console.log("initing controller");

  ngrEnvironment.init({
      fps: 60,
      debug: false,
  });
  ngrInterface.init();

  ngrStage.background('img/bg1.png', 0);

  ngrCamera.constrainZoom({
    min: 0.05,
    max: 2,
  })

  ngrInterface.onmove(function (r) {
    $scope.r = r;
    $scope.$apply();
  })

  ngrGame.init();
  ngrInterface.onclick(function (r) {
    $scope.contextBody = r.body;

  })
})

})

