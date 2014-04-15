angular.module("ConfusionQuest")

  .service('helmet1', function (ngrGame, Item,ConfusionQuestDefaults) {
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

    var defaults =  {
      name: 'Powerup - Helmet 1',
      shape: 'box',
      skin: {
        src: 'img/helmet1.png',
        bg: 'sprite'
      },
      profile: "helmet1",
      userData: {
        doodad: true,
        isCoin: true,
      },
      presets: Item.dimensions
    };

    var Helmet1 = Item({
      stats: stats,
      defaults: defaults
    })
    /*
    var Helmet1 = function (body) {
      _.extend(this, new Item.profile);
      this.stats = stats;
      this.init(body);
    };
    */

    ConfusionQuestDefaults.addDefault(defaults);
    ngrGame.addProfile('helmet1', Helmet1);

  })
