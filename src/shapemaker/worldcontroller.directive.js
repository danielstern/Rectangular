angular.module('shapemaker')
  .directive('worldcontroller', function () {
    return {
      restrict: 'AE',
      templateUrl: function (elem, atts) {
        return "shapemaker/tmpl/worldcontroller.html";
      },
      controller: function ($scope, $attrs, $element, ngrEnvironment, ngrStage, ngrState, ngrLoop) {

        var oldRoom = {};

        $scope.context = {
          scale: 60,
          gravity: 60,
          zoom: 0.5,
          speed: 60,
          drawDebug: true,
          drawSprites: true,
          selectedX: 0,
          scale: 2,
          selectedY: 0,
          selectedAngle: 0,
          room: {
            height: 20,
            width: 25,
            roof: false,
            floor: true,
            leftWall: true,
            rightWall: true
          },
        };

        ngrLoop.addPermanentHook(function () {

          var contextBody = $scope.contextBody;
          var state = ngrState.getState();

          if (contextBody) {
            var bodyPos = contextBody.GetPosition();
            var bodyAngle = contextBody.GetAngle();

            $scope.context.selectedY = bodyPos.y;
            $scope.context.selectedX = bodyPos.x;
            $scope.context.selectedAngle = bodyAngle / Math.PI * 180;
          }

          $scope.state = ngrState.getState();
          $scope.$apply();

        })

        $scope.$watch("context", function () {

          ngrEnvironment.updateRoom($scope.context.room)

          if ($scope.contextBody) {
            //            $scope.contextBody.SetPosition(new b2Vec2(Number($scope.context.selectedX), Number($scope.context.selectedY)));
            //           $scope.contextBody.SetAngle(Number($scope.context.selectedAngle * Math.PI / 180));
          }

          ngrEnvironment.setGravity($scope.context.gravity);
          ngrEnvironment.setWorldSpeed($scope.context.speed);
          ngrEnvironment.setZoom($scope.context.zoom);

          ngrEnvironment.createRoom();

          ngrStage.debug($scope.context.drawDebug);
          ngrStage.toggleStage($scope.context.drawSprites);

        }, true);

        $scope.followContextItem = function () {
          ngrEnvironment.follow($scope.contextBody);
        }

        $scope.properties = "gravity speed zoom".split(' ')

        $scope.addUserData = function (body, key, value) {
          if (!key || !body || !value) throw new Error("You must define a key, body and value to set user data", arguments);
          var data = body.GetUserData() || {};
          data[key] = value;
          body.SetUserData(data);
        }

        $scope.removeUserData = function (body, key) {
          var data = body.GetUserData() || {};
          delete data[key];
          body.SetUserData(data);
        }

      }
    }
  })
