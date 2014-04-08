angular.module('ConfusionQuest')
  .service('confCoin', function (ngrGame) {
    var Coin = function (body) {

      body.setSensor(true);
      body.onimpact(function (body, other) {

        if (other.GetUserData() && other.GetUserData().isHero) {
          body.crumble();
          ngrGame.powerup({
            id: "coin1",
            name: "Bitcoin",
            img: "img/coinGold.png",
            description: "You can redeem these coins for powerful upgrades at the end of each level.",
            flavor: "In the video game world, Bitcoin takes the form of handy coins.",
            points: 10
          });
        }
      })
    }

    ngrGame.addProfile('confCoin', Coin);

  })
