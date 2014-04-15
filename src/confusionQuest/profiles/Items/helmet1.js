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

    Item({
      stats: stats,
      defaults: defaults
    })

  })
