angular.module('shapemaker') 
  .directive('worldcontroller', function() {
    return {
      restrict: 'AE',
      templateUrl: function(elem, atts) {
        return "shapemaker/worldcontroller.html";
      },
      controller: function($scope, $attrs, $element, ngrEnvironment) {

        var q = $scope.q;
        q.scale = 2;
        q.gravity = 60;
        q.speed = 60;
        q.zoom = 0;

        $scope.properties = "gravity speed zoom".split(' ')

        $scope.$watchCollection('q', function() {
          ngrEnvironment.setGravity(q.gravity);
          ngrEnvironment.setWorldSpeed(q.speed);
          ngrEnvironment.setZoom(q.zoom);
        });

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

          savedWorlds = _.filter(savedWorlds,function(world){
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