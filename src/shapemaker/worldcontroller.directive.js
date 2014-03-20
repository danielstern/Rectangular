angular.module('shapemaker')
  .directive('worldcontroller', function() {
    return {
      restrict: 'AE',
      templateUrl: function(elem, atts) {
        return "shapemaker/tmpl/worldcontroller.html";
      },
      controller: function($scope, $attrs, $element, ngrEnvironment, ngrStage, ngrState, ngrLoop) {

        $scope.context = {
          scale:30,
          gravity:60,
          zoom: 0.2,
          speed: 60,
          drawDebug:true,
          drawSprites:true,
          selectedX:0,
          scale:2,
          selectedY:0,
          selectedAngle:0,
          room: {
            height: 0,
            width: 0,
            roof: false,
            floor: true,
            leftWall: true,
            rightWall: true
          },
        };

        $scope.q = $scope.context;

        $scope.updateDraw = function() {
         
           ngrStage.debug($scope.context.drawDebug);
           ngrStage.toggleStage($scope.context.drawSprites);

        };


        ngrLoop.addPermanentHook(function() {
          var contextBody = $scope.contextBody;
          var state = ngrState.getState();
          if (!$scope.editingContext) {
            if (contextBody) {
              var bodyPos = contextBody.GetPosition();
              var bodyAngle = contextBody.GetAngle();
              $scope.contextPos = {
                x: bodyPos.x,
                y: bodyPos.y
              };
              $scope.contextPos.angle = bodyAngle;
            }
          }

          if (!$scope.editingContext) {

            $scope.context.room = $scope.contextRoom || {};
            $scope.context.room.width = Number(state.room.width);
            $scope.context.room.height = Number(state.room.height);
            $scope.context.room.floor = state.room.floor;
            $scope.context.room.leftWall = state.room.leftWall;
            $scope.context.room.rightWall = state.room.rightWall;
            $scope.context.room.roof = state.room.roof;

          }

          $scope.stats.focus = ngrState.getFocus();
          $scope.stats.scale = ngrState.getScale();
          $scope.context.zoom = ngrState.getZoom(true);

          $scope.state = ngrState.getState();
          $scope.$apply();

        })

        $scope.$watch("context", function() {
          //console.log("context changed...",$scope.context);
          if ($scope.editingContext) {
            ngrEnvironment.updateRoom({
              width: $scope.context.room.width,
              height: $scope.context.room.height,
              
            })
            ngrEnvironment.createRoom();
          }

          if ($scope.contextBody) {
            $scope.contextBody.SetPosition(new b2Vec2(Number($scope.selectedX), Number($scope.selectedY)));
            $scope.contextBody.SetAngle(Number($scope.selectedAngle))
          }

          ngrEnvironment.setGravity($scope.context.gravity);
          ngrEnvironment.setWorldSpeed($scope.context.speed);
          ngrEnvironment.setZoom($scope.context.zoom);

          ngrEnvironment.updateRoom({
            floor: $scope.context.room.floor,
            leftWall: $scope.context.room.leftWall,
            rightWall: $scope.context.room.rightWall,
            roof: $scope.context.room.roof,
          })

          ngrEnvironment.createRoom();

        },true);
        
        $scope.clearAll = function() {
          ngrEnvironment.clearAll();
          ngrEnvironment.createRoom();
        };

        $scope.followContextItem = function() {
          ngrEnvironment.follow($scope.contextBody);
        }

        $scope.properties = "gravity speed zoom".split(' ')

 
        $scope.addUserData = function(body, key, value) {
          if (!key || !body || !value) throw new Error("You must define a key, body and value to set user data", arguments);
          var data = body.GetUserData() || {};
          data[key] = value;
          body.SetUserData(data);
        }

        $scope.removeUserData = function(body, key) {
          var data = body.GetUserData() || {};
          delete data[key];
          body.SetUserData(data);
        }

        $scope.save = function(name) {
          if (!name) name = epicId();
          var worldString = JSON.parse(ngrEnvironment.getJSON());
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

        $scope.deleteSavedWorld = function(_dWorld) {

          var savedWorlds = getSavedWorlds();

          savedWorlds = _.filter(savedWorlds, function(world) {
            if (world.name != _dWorld.name) return true;
          })

          localStorage['savedWorlds'] = JSON.stringify(savedWorlds);

          $scope.savedWorlds = savedWorlds;

        }

        $scope.load = function(_world) {
          ngrEnvironment.clearAll();
          ngrEnvironment.load(_world);
          $scope.contextBody = undefined;
        }

        $scope.exportSavedWorld = function(_world) {
          $scope.worldExport = JSON.stringify(_world);
        }
      }
    }
  })
