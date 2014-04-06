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
