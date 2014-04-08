angular.module('ConfusionQuest')
  .service('doorRed', function (ngrGame) {
  
    var RedDoor = function (body) {

      body.setSensor(true);

      body.onimpact(function (body, other) {

        if (other.GetUserData() && other.GetUserData().isHero) {

          if (ngrGame.getEvents().redKey) {
            ngrGame.endGame();
          }
        }

      })
    }

    ngrGame.addProfile('doorRed', RedDoor);

  })