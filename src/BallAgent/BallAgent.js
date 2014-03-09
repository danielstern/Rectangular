angular.module("BallAgent", ['Rectangular', 'ngAudio', 'BallAgentHero', 'BallAgentModels'])
  .service('BallAgent', function(BallAgentLevels, BallAgentHero, BallAgentModels, ngAudio, ngrEnvironment, ngrDisplay, ngrBox, ngrWorld) {

    this.state = {};
    var state = this.state;
    var stateChangeListeners = [];
    var gameOverListeners = [];
    var airborneTimer = 3;
    var jumpReleasedTimer = 15;
    var m = BallAgentModels;
    var hero,
      exit,
      controls,
      jumpReleased = true;

    this.onStateChange = function(listener) {
      stateChangeListeners.push(listener);
    }

    function updateState() {
      _.each(stateChangeListeners, function(l) {
        l(state);
      })
    }

    this.onGameOver = function(listener) {
      gameOverListeners.push(listener);
    }

    this.gotoLevel = function(level) {
      state.currentLevel = level - 1;
      nextLevel();
    }


    function bindControls() {

      var heroState = BallAgentHero.getState();

      Mousetrap.bind({
        'd': function() {
          heroState.goingRight = true;
        },
        'a': function() {
          heroState.goingLeft = true;
        },
        'w': function() {
          if (!jumpReleased) return;
          heroState.isJumping = true;
          jumpReleasedTimer = 15;
          jumpReleased = false;
        },
      }, 'keydown');

      Mousetrap.bind({
        'd': function() {
          heroState.goingRight = false;
        },
        'a': function() {
          heroState.goingLeft = false;
        },
        'w': function() {
          heroState.isJumping = false;
          jumpReleased = true;
        },
      }, 'keyup');

    }

    function handleDeath() {
      state.lives--;

      if (state.lives >= 0) {
        state.currentLevel--;
        nextLevel();
      } else {
        gameOver();
      }
    }

    function gameOver() {
      ngrEnvironment.stop();
      _.each(gameOverListeners, function(l) {
        l(state);
      });
    }


    function newGame() {
      state.lives = 3;
      state.currentLevel = 0;
      nextLevel();
    }

    this.newGame = newGame;

    function tick() {

      var heroState = BallAgentHero.getState(),
        position = BallAgentHero.entity.GetPosition(),
        contacts = BallAgentHero.entity.GetContactList();

      if (airborneTimer) airborneTimer--;
      if (jumpReleasedTimer) jumpReleasedTimer--;

      if (!airborneTimer) {
        heroState.airborne = true;
      }

      if (contacts && contacts.contact) {
        while (contacts) {
          var contact = contacts.contact;

          if (contact.IsTouching() && contacts.other.GetUserData()) {
            var data = contacts.other.GetUserData();

            if (data.exit) {
              ngAudio.play('exit');
              nextLevel();
            }
          }

          if (contact.IsTouching() && contacts.other.GetUserData() && contacts.other.GetUserData().isFloor) {
            heroState.airborne = false;
            airborneTimer = 3;

            if (!jumpReleasedTimer) {
              jumpReleased = true;
            }
          }

          contacts = contacts.next;
        }
      }


      if (position.y > 50) {
        ngAudio.play('die');
        handleDeath();
      }


    }

    var c;

    ngrEnvironment.init($('canvas')[0]);
    function nextLevel() {

      ngrEnvironment.stop();
      ngrEnvironment.blocker()
        .then(function() {
          state.currentLevel++;
          var l = BallAgentLevels.levels[state.currentLevel - 1];

          ngrEnvironment.clearAll();
          if (c) clearTimeout(c);

          state.levelName = l.levelName || "Higginsons Revenge";

          $('.levelName').removeClass('slideInLeft')
            .removeClass('slideOutLeft')
          setTimeout(function(){
             $('.levelName').addClass('animated slideInLeft');
            }, 1);

          c = setTimeout(function(){
             $('.levelName').addClass('animated slideOutLeft');
          }, 3000);

          ngrEnvironment.start();

          if (l.floor) ngrEnvironment.floor();
          if (l.lWall) ngrEnvironment.leftWall();
          if (l.rWall) ngrEnvironment.rightWall();

        //  ngrEnvironment.debug();
          ngrDisplay.background(l.background || 'img/mountain-bg.jpg');

          hero = BallAgentHero.createNewHero();
          exit = m.createExit(l.exit);
          bindControls();

          _.each(l.columns, m.createColumn);
          _.each(l.platforms, m.createPlatform);

          ngrEnvironment.addHook(tick);


          updateState(state);

        });


    }

  })
