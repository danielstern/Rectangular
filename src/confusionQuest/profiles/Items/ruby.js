angular.module('ConfusionQuest')
  .service('ruby', function (ngrGame) {
    var Ruby = function (body) {

      body.setSensor(true);

      body.onimpact(function (other) {

        if (other.GetUserData() && other.GetUserData().isHero) {
          body.crumble();
          ngrGame.powerup({
            id: "ruby",
            name: "Ruby",
            img: "img/gemRed.png",
            description: "Rubies are worth a goodly amount of coins.",
            flavor: "A goodly amount indeed.",
            points: 200
          });
        }
      })
    }

    ngrGame.addProfile('ruby', Ruby);

  })