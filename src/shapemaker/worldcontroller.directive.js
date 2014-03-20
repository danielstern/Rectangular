angular.module('shapemaker')
  .directive('worldcontroller', function() {
    return {
      restrict: 'AE',
      templateUrl: function(elem, atts) {
        return "shapemaker/worldcontroller.html";
      },
      controller: function($scope, $attrs, $element, ngrEnvironment, ngrStage) {

        /*var q = $scope.q;
        q.scale = 2;
        q.gravity = 60;
        q.speed = 60;
        q.zoom = 0;*/

        $scope.context = {
          q: {
            scale:30,
            gravity:60,
            zoom: 0.2
          },
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
          speed: 0,
          gravity: 0,
          zoom: 0
        };

        $scope.updateDraw = function() {
         
           ngrStage.debug($scope.context.drawDebug);
           ngrStage.toggleStage($scope.context.drawSprites);

        };

        

        $scope.$watch("context", function() {
          console.log("context changed...");
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

          ngrEnvironment.setGravity($scope.context.q.gravity);
          ngrEnvironment.setWorldSpeed($scope.context.q.speed);
          ngrEnvironment.setZoom($scope.context.q.zoom);

        },true);
        
        $scope.clearAll = function() {
          ngrEnvironment.clearAll();
          ngrEnvironment.createRoom();
        };

        $scope.followContextItem = function() {
          ngrEnvironment.follow($scope.contextBody);
        }

        $scope.updateRoom = function() {
          ngrEnvironment.updateRoom({
            floor: $scope.context.room.floor,
            leftWall: $scope.context.room.leftWall,
            rightWall: $scope.context.room.rightWall,
            roof: $scope.context.room.roof,
          })

          ngrEnvironment.createRoom();
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
