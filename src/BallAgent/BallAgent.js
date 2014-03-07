angular.module("BallAgent", ['Rectangular', 'ngAudio','BallAgentHero'])
.service('BallAgent', function (BallAgentLevels, BallAgentHero, ngAudio, ngrEnvironment, display, ngrLoop, ngBox, ngWorld, $compile) {

  this.state = {};
  var state = this.state;
  var stateChangeListeners = [];
  var gameOverListeners = [];
  var airborneTimer = 3;

  this.onStateChange = function (listener) {
    stateChangeListeners.push(listener);
  }

  var updateState = function () {
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


    var hero; // = createHero();
    var exit; // = createExit();
    var controls; // = bindControls();
    this.gotoLevel = function (level) {
      state.currentLevel = level - 1;
      nextLevel();
    }

    function createExit(options) {
      var defaults = {
        src: 'img/hi.png',
        x: 20,
        mass: 0,
        position: 'static',
        y: 15.5,
        height: 1,
        width: 1,
      }

      options = _.extend(defaults, options);

      var exitBox = ngBox.shape("box", options);
      exitBox.f.isSensor = true;

      var exitBody = ngWorld.addElement(exitBox);
      exitBody.SetUserData({
        exit: true
      });

      var attrs = {};

      attrs.src = 'img/exit.png';
      attrs.height = 2;
      attrs.width = 2;
      var actor = display.skin(exitBody, attrs);

      return exitBody;
    }

    function createPlatform(options) {

      var defaults = {
        mass: 0,
        position: 'static',
        height: 0.3,
      }

      options = _.extend(defaults, options);

      var platform = ngBox.shape("box", options);
      var pBody = ngWorld.addElement(platform);

      pBody.SetUserData({
        isFloor: true
      });
      display.skin(pBody, {
        y: options.y,
        x: options.x,
        width: options.width * 2,
        height: 0.5
      });

      options.y += 0.2;
      var platformUnder = ngBox.shape("box", options);
      var pSubBody = ngWorld.addElement(platformUnder);

      return platform;
    }



    function createColumn(options) {

      var defaults = {
        position: 'static',
        width: 0.3,
        friction: 3,
      }

      options = _.extend(defaults, options);

      var platform = ngBox.shape("box", options);
      var pBody = ngWorld.addElement(platform);

      // optional hook for a moving platform
/*
    ngrLoop.addHook(function(){
       var currentY = pBody.GetPosition().y;
       var currentX = pBody.GetPosition().x;
       var newY = currentY - 0.01;
       pBody.SetPosition(new b2Vec2(currentX, newY));
    })
    */

      display.skin(pBody, {
        y: options.y,
        x: options.x,
        width: options.width * 2,
        height: options.height * 2
      });


      return platform;
    }


    function bindControls() {

      var jumpReleased = true;
      var heroState = BallAgentHero.getState();

      Mousetrap.bind({
        'd': function() { heroState.goingRight = true;},
        'a': function() { heroState.goingLeft = true;},
        'w': function() { 
          if (!jumpReleased) return;
          heroState.isJumping = true;
          jumpReleased = false;
        },
        }, 'keydown');

      Mousetrap.bind({
        'd': function() { heroState.goingRight = false;},
        'a': function() { heroState.goingLeft = false;},
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

      var heroState = BallAgentHero.getState();

      var contacts = BallAgentHero.entity.GetContactList();
      if (airborneTimer) airborneTimer--;
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
          } else {
            //heroState.airborne = true;
          }
          contacts = contacts.next;
        }
      }      

      var position = BallAgentHero.entity.GetPosition();

      if (position.y > 50) {
        ngAudio.play('die');
        handleDeath();
      }
      
      updateState(state);

    }



    function nextLevel() {

      state.currentLevel++;
      var l = BallAgentLevels.levels[state.currentLevel - 1];
      
      ngrLoop.stop();
      ngrLoop.clearHooks();
      ngWorld.clearAll();

      ngrEnvironment.init($('canvas')[0]);
      if (l.floor) ngrEnvironment.floor();
      if (l.lWall) ngrEnvironment.leftWall();
      if (l.rWall) ngrEnvironment.rightWall();

      ngrEnvironment.debug($('#debugCanvas')[0]);

      
      hero = BallAgentHero.createNewHero();
      exit = createExit(l.exit);
      var controls = bindControls();


      _.each(l.platforms, createPlatform);
      _.each(l.columns, createColumn);


      
      ngrLoop.addHook(tick);

    }

  }

})