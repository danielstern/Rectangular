angular.module("ConfusionQuest")

  .service('helmet1', function (ngrGame) {
    var stats = {
      id: "helmet1",
      img: 'img/helmet1.png',
      name: "Tim Horton's Helmet",
      description: "Increases your defense by 10%. Helmet of legendary coffee magnate Tim Horton.",
      flavor: "They didn't really wear helmets back then.",
      hero: {
        hp: 5,
        defense: 10
      }
    }
    var Helmet1 = function (body) {
      body.onimpact(function (body, other) {

        if (other.GetUserData() && other.GetUserData().isHero) {
          body.crumble();
          console.log("Power up!");
          ngrGame.powerup(stats);
        }
      })
    }

    ngrGame.addProfile('helmet1', Helmet1);

  })
