angular.module("shapemaker", ['ngAudio', 'Rectangular', 'ConfusionQuest']);

angular.module("shapemaker")
  .controller('myDemoCtrl', function ($scope, ngrGame, ConfusionQuestDefaults, ConfusionQuestHud, ConfusionQuest, shapemakerDefaults, $element, ngrStage, ngrData, ngrRoom, ngrCamera, ngrData, ngrDefaults, ngrLoop, ngrWorld, ngrInterface, ngrEnvironment, ngrState, ngAudio, $compile) {

    var contextMenu;
    var contextPin;

    $scope.editingContext = false;
    $scope.stats = {};

    $scope.game = ngrGame;

    shapemakerDefaults.addDefaults(ConfusionQuestDefaults.defaults);

    ngrEnvironment.init($scope.context);
    ngrInterface.init();

    //ngrStage.background('img/bg1.png', 0);

    ngrCamera.constrainZoom({
      min: 0.05,
      max: 2,
    })

    ngrInterface.onmove(function (r) {
      $scope.r = r;
      $scope.$apply();
    })

    ngrInterface.onclick(function (r) {
      $scope.contextBody = r.body;

    })

    ngrStage.background('img/parallax/foggy/bg_0020_fog.png',0);
    ngrStage.background('img/parallax/foggy/bg_0019_fog.png',0);
    ngrStage.background('img/parallax/foggy/bg_0018_fog.png',0);
    ngrStage.background('img/parallax/foggy/bg_0017_fog.png',1);
    ngrStage.background('img/parallax/foggy/bg_0016_fog.png',1);

    Mousetrap.bind({
      'f': function () {
        var cti = $scope.contextBody;
        if (!cti) return;
        if (cti.GetType() == 2) {
          $scope.freezeContextItem();
        } else {
          $scope.unfreezeContextItem();
        }
      },
      'p': function () {
        $scope.pinContextItem();
      },
      'c': function () {
        console.log("it's cannonball time");
        ngrGame.turnToCannonball($scope.contextBody);
      },
      'u': function () {
        $scope.unpinContextItem();
      },
      'n': function () {
        $scope.constrainFocus();
      },
      'c': function () {
        $scope.controlContextBody();
      },
      'ctrl+s': function (e) {
        e.preventDefault();
        $scope.save();
      },
      'ctrl+l': function (e) {
        e.preventDefault();
        $scope.loadLastMap();
      },
      'd': function () {
        $scope.toggleDebug();
      },

      'x': function () {
        $scope.explodeContextItem();
      },
      'del': function () {
        $scope.deleteContextItem();
      },
      'g': function () {
        $scope.followContextItem();
      }
    }, 'keydown');

    $(document).bind("contextmenu", function (event) {
      event.preventDefault();
      if (ngrInterface.getBodyAtMouse()) {
        if (contextMenu) $(contextMenu).hide();
        contextMenu = angular.element("<div customcontextmenu></div>");
        var cmpl = $compile(contextMenu);
        $('body').append(contextMenu);
        $scope.contextBody = ngrInterface.getBodyAtMouse();
        cmpl($scope);

        $scope.contextType = $scope.contextBody.GetType();

        $(contextMenu)
          .css({
            top: event.pageY + "px",
            left: event.pageX + "px"
          });

        contextPin = ngrInterface.pinToMouse($scope.contextBody);

        $(document).bind("mousedown", function (event) {
          if (event.target.tagName == "LI") return true;
          if (contextMenu) {
            hideContextMenu();
          }

        })
      }
    });

    $scope.world = ngrWorld;

    $scope.toggleDebug = function () {
      $scope.context.drawDebug = !$scope.context.drawDebug;
    }

    $scope.newMaker = function () {
      var el = angular.element("<shapemaker></shapemaker>");
      var cmpl = $compile(el);
      $element.find('makers').append(el);
      cmpl($scope);
    }

    $scope.explodeContextItem = function () {
      //console.log("EXPLODING!");
      ngrGame.explode($scope.contextBody);
    }

    $scope.controlContextBody = function () {
      if ($scope.contextBody) ngrGame.control($scope.contextBody, "questHero");
    }

    $scope.startGame = function () {
      ngrGame.init();
      $('button').focus();
      $('button').blur();
    }

    $scope.constrainFocus = function () {
      var room = $scope.context.room;
      ngrCamera.constrainFocus({
        x: 0,
        y: 0,
        width: room.width,
        height: room.height
      });
    }

    $scope.clearAll = function () {
      ngrEnvironment.clearAll();
    };

    $('canvas')[0].addEventListener('dblclick', function () {
      ngrCamera.unfollow();
      //  ngrInterface.focusToMouse();
    });

    ngrInterface.onwheel(function (delta) {
      if (delta < 0) {
        $scope.context.zoom -= 0.05;
      } else {
        $scope.context.zoom += 0.05;
      }

      if ($scope.context.zoom < 0.05) $scope.zoom = 0.05;
    })

    ngrGame.dragToPan(true);
    ngrGame.godMode(true);

    $scope.deleteContextItem = function () {
      $scope.contextBody.crumble();
    }

    $scope.freezeContextItem = function () {
      $scope.contextBody.freeze();

    }

    $scope.editContext = function () {
      ngrLoop.stop();
    }

    $scope.stopEditContext = function () {
      ngrLoop.start();
    }

    $scope.unfreezeContextItem = function () {

      $scope.contextBody.unfreeze();

    }

    $scope.pinContextItem = function () {
      var pin = ngrInterface.pinToMouse($scope.contextBody);
      $scope.contextBody.pins = $scope.contextBody.pins || [];
      $scope.contextBody.pins.push(pin);
      hideContextMenu();
    }

    $scope.unpinContextItem = function () {
      var cti = $scope.contextBody;
      var pins = cti.pins;
      _.each(pins, function (pin) {
        ngrWorld.unpin(pin);
      })

      hideContextMenu();
    }

    $scope.save = function (name) {
      if (!name) name = epicId();
      var worldString = JSON.parse(ngrData.getJSON(ngrWorld.getWorld()));
      worldString.name = name;
      var savedWorlds = getSavedWorlds();

      savedWorlds.push(worldString);
      localStorage['savedWorlds'] = JSON.stringify(savedWorlds);

      $scope.savedWorlds = savedWorlds;

      $scope.worldName = '';

    }

    function getSavedWorlds() {
      var savedWorlds;
      var savedWorldsStr = localStorage['savedWorlds'];
      if (savedWorldsStr) {
        try {
          savedWorlds = JSON.parse(savedWorldsStr);
        } catch (e) {
          console.error("Couldn't parse saved worlds", savedWorldsStr);
        }
      };

      return savedWorlds || [];

    }

    $scope.deleteSavedWorld = function (_dWorld) {

      var savedWorlds = getSavedWorlds();

      savedWorlds = _.filter(savedWorlds, function (world) {
        if (world.name != _dWorld.name) return true;
      })

      localStorage['savedWorlds'] = JSON.stringify(savedWorlds);

      $scope.savedWorlds = savedWorlds;

    }

    $scope.load = function (_data) {
      ngrEnvironment.clearAll();
      ngrData.load(_data, ngrWorld.getWorld());
      $scope.contextBody = undefined;

      ngrRoom.clearRoom();
      ngrRoom.createRoom();

      $scope.context.room = _.clone(ngrState.getState().room);
    }

    $scope.loadLastMap = function () {
      var map = $scope.savedWorlds[$scope.savedWorlds.length - 1];
      $scope.load(map);
    }

    $scope.exportSavedWorld = function (_world) {
      $scope.worldExport = ngrData.getJSON();
    }

    if (localStorage['savedWorlds']) {
      $scope.savedWorlds = JSON.parse(localStorage['savedWorlds']);
    };

    function hideContextMenu() {
      if (contextMenu) {

        $(contextMenu).hide();
        contextmenu = null;
        ngrWorld.destroyJoint(contextPin);

      }
    }

  })
