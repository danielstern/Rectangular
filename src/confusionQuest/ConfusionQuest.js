angular.module('ConfusionQuest', [
  'Rectangular',
  'Calvin', 'Mahakana'
])

angular.module('ConfusionQuest')
  .service("ConfusionQuest", function(
    ngrGame, ngrSoundtrack,
    ngrEnvironment, ngrLoop, ngrDisplay, ngrCamera, ngrData, ngrState, ngrWorld, ngrInterface, ngrStage,
    ConfusionQuestDefaults, ConfusionQuestLevels,
    Calvin,
    spikes, Mahakana, Madness, Insanity,
    confCoin, ruby, keyRed, doorRed,
    devLevel,
    boots1, helmet1
  ) {

    var CQState = {
      lives: 0,
      powerups: [],
      score: 0,
    };

    var hero = undefined;
    var stateChangeListeners = [];
    var messageListeners = [];

    this.onstatechange = function(l) {
      stateChangeListeners.push(l);
    }

    this.onmessage = function(l) {
      messageListeners.push(l);
    }



    ngrGame.init = function() {
      CQState = {
        lives: 3,
        powerups: [],
        score: 0,
      }

      console.log("Initing game!");
      ngrEnvironment.clearAll();

      ngrData.load(ConfusionQuestLevels.levels[0]);


      ngrStage.background('img/parallax/foggy/bg_0020_fog.png', 0);
      ngrStage.background('img/parallax/foggy/bg_0019_fog.png', 0);
      ngrStage.background('img/parallax/foggy/bg_0018_fog.png', 0);
      ngrStage.background('img/parallax/foggy/bg_0017_fog.png', 1);
      ngrStage.background('img/parallax/foggy/bg_0016_fog.png', 1);
      ngrStage.background('img/parallax/foggy/bg_0015_fog.png', 3);
      ngrStage.background('img/parallax/foggy/bg_0014_fog.png', 2);
      /*
      ngrStage.background('img/parallax/foggy/bg_0013_fog.png',4);
      ngrStage.background('img/parallax/foggy/bg_0012_fog.png',2);
      ngrStage.background('img/parallax/foggy/bg_0011_fog.png',3);
      ngrStage.background('img/parallax/foggy/bg_0010_fog.png',2);
      */
      /**/
      ngrStage.background('img/parallax/foggy/bg_0009_fog.png', 5);
      ngrStage.background('img/parallax/foggy/bg_0008_fog.png', 5);
      ngrStage.background('img/parallax/foggy/bg_0007_fog.png', 5);
      ngrStage.background('img/parallax/foggy/bg_0006_fog.png', 5);
      ngrStage.background('img/parallax/foggy/bg_0005_fog.png', 6);
      ngrStage.background('img/parallax/foggy/bg_0004_fog.png', 7);
      ngrStage.background('img/parallax/foggy/bg_0003_fog.png', 7);
      ngrStage.background('img/parallax/foggy/bg_0002_fog.png', 7);
      ngrStage.background('img/parallax/foggy/bg_0001_fog.png', 8);
      ngrStage.background('img/parallax/foggy/bg_0000_fog.png', 9);

      ngrCamera.setZoom(1);
      ngrLoop.setSpeed(60);

      var room = ngrState.getState().room;
      ngrCamera.constrainFocus({
        x: 0,
        y: 0,
        width: room.width,
        height: room.height
      });

      _.call(stateChangeListeners, CQState);
      _.call(messageListeners, "Demo Level");
    }

    ngrGame.endGame = function() {
      ngrGame.screen({
        bg: "img/Confusion-Quest-Title-NoText.png",
      });
      _.call(messageListeners, "Demo Over");
      setTimeout(ngrGame.init, 2000);
    }

    ngrGame.powerup = function(powerup) {

      if (_.find(CQState.powerups, function(_powerup) {
        if (_powerup.id == powerup.id) return true;
      })) {} else {
        ngrGame.pause();
        var modal = ngrDisplay.modal({
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
        _.each(powerup.hero, function(boost, stat) {
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

    ngrGame.oncreateentity(function(entity) {

      if (entity.type == "Calvin") {
        ngrGame.control(entity, {
          'a': 'goingLeft',
          'd': 'goingRight',
          'w': 'isJumping',
          's': 'isCrouching',
          'p': 'isPunching',
          'k': 'isKicking',
        });

        hero = entity;

        CQState.hero = hero;

        ngrCamera.follow(entity.body);

        console.log("Adding listener to", hero);

        hero.onstatechange(function(heroState) {
          //console.log("Hero change",heroState)
          _.call(stateChangeListeners, CQState);
          if (heroState.dead) {
            ngrCamera.unfollow();
            ngrCamera.setZoom(0.5);
            console.log("Hero dead.");
            ngrLoop.setSpeed(30);

            ngrLoop.wait(30)
              .then(function() {
                ngrGame.init();
              })
          }
        });

      }
    })

  })
