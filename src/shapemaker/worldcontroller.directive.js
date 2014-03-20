angular.module('shapemaker')
  .directive('worldcontroller', function() {
    return {
      restrict: 'AE',
      templateUrl: function(elem, atts) {
        return "shapemaker/tmpl/worldcontroller.html";
      },
      controller: function($scope, $attrs, $element, ngrEnvironment, ngrStage, ngrState, ngrLoop) {

        var oldRoom = {};

        $scope.context = {
          scale: 30,
          gravity: 60,
          zoom: 0.2,
          speed: 60,
          drawDebug: true,
          drawSprites: true,
          selectedX: 0,
          scale: 2,
          selectedY: 0,
          selectedAngle: 0,
          room: {
            height: 0,
            width: 0,
            roof: false,
            floor: true,
            leftWall: true,
            rightWall: true
          },
        };

        ngrLoop.addPermanentHook(function() {
          var contextBody = $scope.contextBody;
          var state = ngrState.getState();
          if (!$scope.editingContext) {
            if (contextBody) {
              var bodyPos = contextBody.GetPosition();
              var bodyAngle = contextBody.GetAngle();
  
              $scope.context.selectedY =  bodyPos.y;
              $scope.context.selectedX = bodyPos.x;
              $scope.context.selectedAngle = bodyAngle / Math.PI * 180;
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
          if ($scope.editingContext) {
            ngrEnvironment.updateRoom({
              width: Number($scope.context.room.width),
              height: Number($scope.context.room.height),

            })

            if ($scope.contextBody) {
              //console.log("setting context body stuff",)
              $scope.contextBody.SetPosition(new b2Vec2(Number($scope.context.selectedX), Number($scope.context.selectedY)));
               $scope.contextBody.SetAngle(Number($scope.context.selectedAngle * Math.PI / 180))
            }
          }

          ngrEnvironment.setGravity($scope.context.gravity);
          ngrEnvironment.setWorldSpeed($scope.context.speed);
          ngrEnvironment.setZoom($scope.context.zoom);

          if (!_.isEqual(oldRoom, $scope.context.room)) {

            ngrEnvironment.updateRoom({
              floor: $scope.context.room.floor,
              leftWall: $scope.context.room.leftWall,
              rightWall: $scope.context.room.rightWall,
              roof: $scope.context.room.roof,
            
            })

            ngrEnvironment.createRoom();
          }

          oldRoom = $scope.context.room;

          ngrStage.debug($scope.context.drawDebug);
          ngrStage.toggleStage($scope.context.drawSprites);


        }, true);

       

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

      }
    }
  })
