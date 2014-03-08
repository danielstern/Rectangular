angular.module("BallAgent", ['Rectangular', 'ngAudio', 'BallAgentHero', 'BallAgentModels'])
.service('BallAgent', function (BallAgentLevels, BallAgentHero, BallAgentModels, ngAudio, ngrEnvironment, ngrDisplay, ngrBox, ngrWorld) {

  this.state = {};
  var state = this.state;
  var stateChangeListeners = [];
  var gameOverListeners = [];
  var airborneTimer = 3;
  var m = BallAgentModels;
  var hero,
    exit,
    controls,
    jumpReleased = true;

  this.onStateChange = function (listener) {
    stateChangeListeners.push(listener);
  }

  function updateState() {
    _.each(stateChangeListeners, function (l) {
      l(state);
    })
  }

  this.onGameOver = function (listener) {
    gameOverListeners.push(listener);
  }


  this.init = function (canvas, debugCanvas) {

    state.currentLevel = 0;
    state.lives = 3;
    state.score = 0;
    this.gotoLevel = function (level) {
      state.currentLevel = level - 1;
      nextLevel();
    }

  }

  function bindControls() {
    
    var heroState = BallAgentHero.getState();

    Mousetrap.bind({
      'd': function () {
        heroState.goingRight = true;
      },
      'a': function () {
        heroState.goingLeft = true;
      },
      'w': function () {
        if (!jumpReleased) return;
        heroState.isJumping = true;
        jumpReleased = false;
      },
    }, 'keydown');

    Mousetrap.bind({
      'd': function () {
        heroState.goingRight = false;
      },
      'a': function () {
        heroState.goingLeft = false;
      },
      'w': function () {
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
    _.each(gameOverListeners, function (l) {
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
    if (!airborneTimer) {
      heroState.airborne = true;
    //  jumpReleased = true;
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
        }
        
        contacts = contacts.next;
      }
    }


    if (position.y > 50) {
      ngAudio.play('die');
      handleDeath();
    }

    updateState(state);

  }

  function nextLevel() {

    state.currentLevel++;
    var l = BallAgentLevels.levels[state.currentLevel - 1];

    ngrEnvironment.stop();
    ngrEnvironment.clearHooks();
    ngrWorld.clearAll();

    ngrEnvironment.init($('canvas')[0]);
    if (l.floor) ngrEnvironment.floor();
    if (l.lWall) ngrEnvironment.leftWall();
    if (l.rWall) ngrEnvironment.rightWall();

    ngrEnvironment.debug($('#debugCanvas')[0]);
    ngrDisplay.background('img/mountain-bg.jpg');

    hero = BallAgentHero.createNewHero();
    exit = m.createExit(l.exit);
    var controls = bindControls();

    _.each(l.platforms, m.createPlatform);
    _.each(l.columns, m.createColumn);

    ngrEnvironment.addHook(tick);

  }

})