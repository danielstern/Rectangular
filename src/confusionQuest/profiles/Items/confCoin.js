angular.module('ConfusionQuest')
  .service('confCoin', function (ngrGame,ConfusionQuestDefaults) {
    var Coin = function (body) {

      body.setSensor(true);
      body.onimpact(function (other) {

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

    var defaults = {
      name: 'Coin',
      shape: 'box',
      skin: {
        src: 'img/coinGold.png',
        bg: 'sprite'
      },
      profile: "confCoin",
      userData: {
        doodad: true,
        isCoin: true,
      },
      presets: {
        radius: 1,
        height: 1,
        width: 1,
        restitution: 0.2,
        density: 0.2
      }

    }

    ConfusionQuestDefaults.addDefault(defaults);
    ngrGame.addProfile('confCoin', Coin);

  })
