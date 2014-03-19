angular.module("BallAgent", ['Rectangular', 'ngAudio', 'BallAgentHero', 'BallAgentModels'])
  .service('BallAgent', function(BallAgentLevels, BallAgentHero, BallAgentModels, ngAudio, ngrEnvironment, ngrDisplay, ngrBox, ngrWorld, ngrDebug) {

    this.state = {};
    var state = this.state;
    var stateChangeListeners = [];
    var gameOverListeners = [];
    var winListeners = [];
    var airborneTimer = 3;
    var jumpReleasedTimer = 15;
    var LIVES = 2;
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

    this.onWin = function(listener) {
      winListeners.push(listener);
    }

    this.gotoLevel = function(level) {
      state.currentLevel = level - 1;
      nextLevel();
    }

    ngAudio.muteAll();


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

      ngrEnvironment.blocker()
        .then(function() {
          ngrEnvironment.clearAll();
        })
    }

    function win() {
      ngrEnvironment.stop();
      _.each(winListeners, function(l) {
        l(state);
      });

      ngrEnvironment.blocker()
        .then(function() {
          ngrEnvironment.clearAll();
        })
    }



    function newGame() {
      state.lives = LIVES;
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
            if (!jumpReleasedTimer) {
              jumpReleased = true;
              if (!airborneTimer) ngAudio.play('land');
            }

            heroState.airborne = false;
            airborneTimer = 3;

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
    var goingToNextLevel = false;

    ngrEnvironment.init({
      scale: 60,
      floor: true,
      constrainFocusToRoom: true,
      zoom: 1.5,
      worldWidth: 30,
      worldHeight: 20,
      room: {
        width: 30,
        height: 20,
        floor: false,
        leftWall: true,
        rightWall: true,
        roof: false
      }
    });

    function nextLevel() {
      if (goingToNextLevel) return;
      goingToNextLevel = true;

      ngrEnvironment.stop();
      ngrEnvironment.blocker()
        .then(function() {
          state.currentLevel++;
          var l = BallAgentLevels.levels[state.currentLevel - 1];

          if (!l) {
            win();
            return;
          }

          ngrEnvironment.clearAll();
          if (c) clearTimeout(c);

          state.levelName = l.levelName;

          $('.levelName').removeClass('slideInLeft')
            .removeClass('slideOutLeft')
          setTimeout(function() {
            $('.levelName').addClass('animated slideInLeft');
          }, 1);

          ngrDebug.reset();
          c = setTimeout(function() {
            $('.levelName').addClass('animated slideOutLeft');
          }, 3000);

          ngrEnvironment.start();
          ngrEnvironment.createRoom({
            src: 'img/tile.png',
            bg: 'tiled'
          });

          if (l.floor) ngrEnvironment.floor({
            src: 'img/tile.png',
            bg: 'tiled'
          })

          ngrDisplay.background(l.background || 'img/mountain-bg.jpg');


          hero = BallAgentHero.createNewHero();
          exit = m.createExit(l.exit);
          bindControls();

          ngrEnvironment.setFocusOffset({
            x:0,
            y:0
          })

         ngrEnvironment.follow(hero.body);

          goingToNextLevel = false;

          _.each(l.columns, m.createColumn);
          _.each(l.platforms, m.createPlatform);

          ngrEnvironment.addHook(tick);

          updateState(state);

        });


    }

  })
