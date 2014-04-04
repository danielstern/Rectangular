angular.module('ConfusionQuest')

  .service('boots1', function (ngrGame) {
    var stats = {
      id: "boots1",
      img: 'img/powershoe.png',
      name: "Trevon's Greaves of Dunking",
      description: "These legendary shoes increase your jumping power by 10%. Also makes you run a bit faster.",
      flavor: "Thou tries to dunks't against me, ser?",
      hero: {
        speed: 5,
        jump: 10
      }
    }
    var Boots1 = function (body) {
      body.onimpact(function (body, other) {

        if (other.GetUserData() && other.GetUserData().isHero) {
          body.crumble();
          console.log("Power up!");
          ngrGame.powerup(stats);
        }
      })
    }

    ngrGame.addProfile('boots1', Boots1);

  })
