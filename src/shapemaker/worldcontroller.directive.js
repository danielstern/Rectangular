angular.module('shapemaker')
  .directive('worldcontroller', function () {
    return {
      restrict: 'AE',
      templateUrl: function (elem, atts) {
        return "shapemaker/tmpl/worldcontroller.html";
      },
      controller: function ($scope, ngrCamera, $attrs, ngrRoom, ngrCamera, shapemakerDefaults, $element, ngrEnvironment, ngrStage, ngrState, ngrLoop) {

        $scope.context = shapemakerDefaults.context;

        ngrLoop.addPermanentHook(function () {

          var contextBody = $scope.contextBody;
          var state = ngrState.getState();

          if (contextBody) {
            var bodyPos = contextBody.GetPosition();
            var bodyAngle = contextBody.GetAngle();

            $scope.context.userData = contextBody.GetUserData();
            $scope.context.selectedY = bodyPos.y;
            $scope.context.selectedX = bodyPos.x;
            $scope.context.selectedAngle = bodyAngle / Math.PI * 180;
          }

          $scope.state = ngrState.getState();
          $scope.$apply();

        })

        $scope.$watchCollection("context.room",function(){

           ngrState.updateRoom($scope.context.room)
           ngrRoom.createRoom();
        })

        $scope.$watch("context", function () {


          if ($scope.contextBody) {
            //            $scope.contextBody.SetPosition(new b2Vec2(Number($scope.context.selectedX), Number($scope.context.selectedY)));
            //           $scope.contextBody.SetAngle(Number($scope.context.selectedAngle * Math.PI / 180));
          }

          ngrState.updateState("gravity", $scope.context.gravity);
          ngrState.updateState("gravity", $scope.context.speed);
          ngrCamera.setZoom($scope.context.zoom);

         // ngrEnvironment.createRoom();

          ngrStage.debug($scope.context.drawDebug);
          ngrStage.toggleStage($scope.context.drawSprites);

        }, true);



        $scope.followContextItem = function () {
          ngrCamera.follow($scope.contextBody);
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
